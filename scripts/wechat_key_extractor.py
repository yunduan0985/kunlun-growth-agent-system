import ctypes
import objc
from Foundation import NSDictionary
import sys

# 加载 Cocoa Security & CoreFoundation 框架
try:
    Security = ctypes.CDLL('/System/Library/Frameworks/Security.framework/Security')
    CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
except Exception as e:
    print(f"❌ Failed to load framework: {e}")
    sys.exit(1)

# 定义 C 接口签名
Security.SecItemCopyMatching.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_void_p)]
Security.SecItemCopyMatching.restype = ctypes.c_int32

CF.CFArrayGetCount.argtypes = [ctypes.c_void_p]
CF.CFArrayGetCount.restype = ctypes.c_long
CF.CFArrayGetValueAtIndex.argtypes = [ctypes.c_void_p, ctypes.c_long]
CF.CFArrayGetValueAtIndex.restype = ctypes.c_void_p

# 构建查询（利用官方属性拼写，防 EADDRINUSE/TypeID 84 错误）
query = {
    'class': 'genp',          # kSecClassGenericPassword
    'r_Attributes': True,     # kSecReturnAttributes
    'r_Data': True,           # kSecReturnData
    'm_Limit': 'all'          # kSecMatchLimitAll
}

query_ns = NSDictionary.dictionaryWithDictionary_(query)
query_ptr = objc.pyobjc_id(query_ns)
result_ptr = ctypes.c_void_p()

status = Security.SecItemCopyMatching(query_ptr, ctypes.byref(result_ptr))

if status == 0:
    res_val = result_ptr.value
    result_obj = objc.objc_object(c_void_p=res_val)
    
    # 支持 1 条或多条结果的兼容解析
    items = []
    if result_obj.className() in ['__NSArrayM', '__NSArrayI']:
        items = list(result_obj)
    elif result_obj.className() in ['__NSDictionaryM', '__NSDictionaryI']:
        items = [result_obj]
    else:
        sys.exit(0)

    for item in items:
        service = item.get('svce') # kSecAttrService
        account = item.get('acct') # kSecAttrAccount
        label = item.get('labl')   # kSecAttrLabel
        data = item.get('v_Data')  # kSecValueData
        
        # 寻找微信密钥，输出给网关子进程
        if (service and 'wechat' in service.lower()) or (label and 'wechat' in label.lower()):
            secret = ""
            if data:
                try:
                    secret = bytes(data).hex().upper()
                except Exception:
                    secret = bytes(data).decode('utf-8', errors='ignore')
            # 仅输出机器可读的 Key
            print(secret)
            sys.exit(0)
    print("NOT_FOUND")
else:
    print(f"FAILED_{status}")
