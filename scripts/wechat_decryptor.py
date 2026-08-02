import sys
import os
import hmac
import hashlib
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def decrypt_wechat_db(db_path, key_hex, out_path):
    """
    使用 64 位十六进制密钥解密微信 SQLCipher 数据库，导出为标准 SQLite 数据库
    """
    if len(key_hex) != 64:
        print("❌ Error: Key must be a 64-character hex string.")
        return False
        
    master_key = bytes.fromhex(key_hex)
    page_size = 4096
    reserve_size = 48 # SQLCipher v4 默认预留大小
    
    if not os.path.exists(db_path):
        print(f"❌ Error: Database file not found: {db_path}")
        return False

    file_size = os.path.getsize(db_path)
    if file_size % page_size != 0:
        print("❌ Error: Invalid database file size (not a multiple of 4096).")
        return False
        
    total_pages = file_size // page_size
    print(f"📖 Starting decryption: {total_pages} pages...")

    backend = default_backend()

    with open(db_path, 'rb') as f_in, open(out_path, 'wb') as f_out:
        # 读取 Page 1
        page1 = f_in.read(page_size)
        if not page1:
            return False
            
        # Page 1 前 16 字节是 Salt 值
        salt = page1[:16]
        
        # SQLCipher v4 的 Page Key 派生：使用 HMAC-SHA512，对当前页码 (1) 与 MasterKey 进行哈希
        # 页码为 4 字节大端整数
        page_num_bytes = (1).to_bytes(4, byteorder='big')
        page_key = hmac.new(master_key, page_num_bytes, hashlib.sha512).digest()[:32]
        
        # IV 在每一页预留空间的最后 48 字节中，占据前 16 字节 (offset: page_size - reserve_size -> page_size - reserve_size + 16)
        iv_offset = page_size - reserve_size
        iv = page1[iv_offset : iv_offset + 16]
        
        # 解密数据区：Page 1 的数据区从 16 字节开始（跳过 Salt）
        enc_data = page1[16:iv_offset]
        
        cipher = Cipher(algorithms.AES(page_key), modes.CBC(iv), backend=backend)
        decryptor = cipher.decryptor()
        dec_data = decryptor.update(enc_data) + decryptor.finalize()
        
        # 写入标准 SQLite 头部 "SQLite format 3\x00" 和解密后的数据，最后补全预留区（保持页面大小为 4096）
        f_out.write(b'SQLite format 3\x00' + dec_data + page1[iv_offset:])
        
        # 处理 Page 2 及后续页面
        for page_num in range(2, total_pages + 1):
            page_data = f_in.read(page_size)
            if not page_data:
                break
                
            page_num_bytes = page_num.to_bytes(4, byteorder='big')
            # 派生该页的专属 Page Key
            page_key = hmac.new(master_key, page_num_bytes, hashlib.sha512).digest()[:32]
            
            iv = page_data[iv_offset : iv_offset + 16]
            enc_data = page_data[:iv_offset]
            
            cipher = Cipher(algorithms.AES(page_key), modes.CBC(iv), backend=backend)
            decryptor = cipher.decryptor()
            dec_data = decryptor.update(enc_data) + decryptor.finalize()
            
            f_out.write(dec_data + page_data[iv_offset:])
            
    print(f"🎉 Decryption completed successfully: {out_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 wechat_decryptor.py <enc_db> <key_hex> <out_db>")
        sys.exit(1)
    decrypt_wechat_db(sys.argv[1], sys.argv[2], sys.argv[3])
