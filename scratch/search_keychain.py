import ctypes
import objc
from Foundation import NSDictionary, kCFBooleanTrue
import sys

# 加载框架
try:
    Security = ctypes.CDLL('/System/Library/Frameworks/Security.framework/Security')
    CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
except Exception as e:
    print(f"❌ Failed to load framework: {e}")
    sys.exit(1)

# 定义 C 签名
Security.SecItemCopyMatching.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_void_p)]
Security.SecItemCopyMatching.restype = ctypes.c_int32

# 使用官方确认的底层 String Key 重新构造标准 Python Dictionary
query = {
    'class': 'genp',          # kSecClassGenericPassword
    'r_Attributes': True,     # kSecReturnAttributes (对应 'r_Attributes')
    'r_Data': True,           # kSecReturnData (对应 'r_Data')
    'm_Limit': 'all'          # kSecMatchLimitAll (对应 'm_LimitAll' 值，匹配键为 'm_Limit')
}

query_ns = NSDictionary.dictionaryWithDictionary_(query)
query_ptr = objc.pyobjc_id(query_ns)
result_ptr = ctypes.c_void_p()

status = Security.SecItemCopyMatching(query_ptr, ctypes.byref(result_ptr))

if status == 0:
    # ⚠️ 关键 Bug 修复：当匹配结果仅有 1 条记录时，SecItemCopyMatching 会直接返回 NSDictionary
    # 而非 NSArray，导致 objectAtIndex: 崩溃。我们直接用 PyObjC 智能类型转换进行解析！
    res_val = result_ptr.value
    result_obj = objc.objc_object(c_void_p=res_val)
    
    # 转换为 Python 列表以统一迭代
    items = []
    if result_obj.className() == '__NSArrayM' or result_obj.className() == '__NSArrayI':
        items = list(result_obj)
    elif result_obj.className() == '__NSDictionaryM' or result_obj.className() == '__NSDictionaryI':
        items = [result_obj]
    else:
        print("Unknown result type:", result_obj.className())
        sys.exit(0)

    found = False
    for item in items:
        # 使用官方底层 Key 读取属性
        service = item.get('svce') # kSecAttrService
        account = item.get('acct') # kSecAttrAccount
        label = item.get('labl')   # kSecAttrLabel
        data = item.get('v_Data')  # kSecValueData
        
        if (service and 'wechat' in service.lower()) or (label and 'wechat' in label.lower()):
            found = True
            secret = ""
            if data:
                try:
                    # 微信密钥是二进制，我们直接转大写 64 字节 Hex
                    secret = bytes(data).hex().upper()
                except Exception:
                    secret = bytes(data).decode('utf-8', errors='ignore')
            print(f"Label: {label} | Service: {service} | Account: {account} | Key: {secret}")
    if not found:
        print("ℹ️ No WeChat related items found in Keychain.")
else:
    print(f"❌ SecItemCopyMatching failed with status: {status}")
