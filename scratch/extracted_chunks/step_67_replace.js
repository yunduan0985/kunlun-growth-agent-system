try
    -- 动态获取当前系统中微信的绝对路径
    set wechatPath to POSIX path of (path to application "WeChat")
    -- 拼接微信内部的 Unix 二进制可执行文件路径
    set binaryPath to wechatPath & "Contents/MacOS/WeChat"
    -- 直接以后台 Unix 进程方式运行，绕过 LaunchServices 的单实例限制
    do shell script quoted form of binaryPath & " > /dev/null 2>&1 &"
on error
    -- 兜底逻辑：尝试移动硬盘默认路径下的二进制文件
    try
        do shell script "/Volumes/MOVESPEED/Applications/WeChat.app/Contents/MacOS/WeChat > /dev/null 2>&1 &"
    on error errMsg
        display dialog "无法启动双开微信，请确认微信已安装且路径正确。" buttons {"确定"} default button 1 with icon stop
    end try
end try