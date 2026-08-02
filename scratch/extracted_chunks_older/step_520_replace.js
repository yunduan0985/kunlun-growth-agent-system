  } catch (err) {
    console.warn("读取云端数据失败，触发第三层离线降级机制:", err);
    
    // 如果本地有缓存，直接用缓存但标记 offline = true
    if (cachedData && cachedData.data) {
      return {
        source: 'fallback',
        offline: true,
        data: cachedData.data,
        versionInfo: cachedData.data.versionInfo || { version: cachedData.version, desc: "历史缓存数据" }
      };
    }
    
    // 如果完全没有缓存且断网/云端失败，优雅降级为本地内置静态数据包，避免冷启动白屏与红字报错
    console.warn("首次冷启动且云端数据不可用，静默降级为使用本地静态招生数据基线");
    return {
      source: 'local_fallback',
      offline: true,
      data: null,
      versionInfo: { version: "local_default", desc: "本地代码包静态数据" }
    };
  }