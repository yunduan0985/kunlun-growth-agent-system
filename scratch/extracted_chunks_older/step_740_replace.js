    const requestDriving = new Promise((resolve, reject) => {
      wx.request({
        url: "https://apis.map.qq.com/ws/direction/v1/driving/",
        data: { from, to, key: mapKey },
        timeout: 4000,
        success: (res) => {
          if (res.statusCode === 200 && res.data && res.data.status === 0) {
            resolve(res.data.result.routes[0]);
          } else {
            reject(res.data ? res.data.message : "API Error");
          }
        },
        fail: (err) => reject(err)
      });
    });
    const requestTransit = new Promise((resolve, reject) => {
      wx.request({
        url: "https://apis.map.qq.com/ws/direction/v1/transit/",
        data: { from, to, key: mapKey },
        timeout: 4000,
        success: (res) => {
          if (res.statusCode === 200 && res.data && res.data.status === 0) {
            resolve(res.data.result.routes[0]);
          } else {
            reject(res.data ? res.data.message : "API Error");
          }
        },
        fail: (err) => reject(err)
      });
    });