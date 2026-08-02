      pdf2026: school.pdf2026 || (admission.data.pdfLinks && admission.data.pdfLinks.selfAdmission2026Index) || "",
      isPdf2026Fallback: !school.pdf2026,
      consultantTitle,
      consultantText
    });
    this.fetchRealCommute(lastReport.homeLocation, school);
  },

  fetchRealCommute(homeLocation, school) {
    if (!homeLocation || !homeLocation.lat || !homeLocation.lng || !school || !school.location) return;
    const from = `${homeLocation.lat},${homeLocation.lng}`;
    const to = `${school.location.lat},${school.location.lng}`;
    const mapKey = "OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77";
    const requestDriving = new Promise((resolve, reject) => {
      wx.request({
        url: "https://apis.map.qq.com/ws/direction/v1/driving/",
        data: { from, to, key: mapKey },
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
    Promise.all([requestDriving, requestTransit]).then(([drivingRoute, transitRoute]) => {
      const distanceKm = Number((drivingRoute.distance / 1000).toFixed(1));
      const driveMin = Math.round(drivingRoute.duration / 60);
      const transitMin = Math.round(transitRoute.duration / 60);
      const label = distanceKm <= 6 ? "通勤友好" : distanceKm <= 14 ? "可接受" : "通勤成本偏高";
      console.log(`🧭 腾讯地图路线规划成功: 里程 ${distanceKm}km, 驾车 ${driveMin}分钟, 公交 ${transitMin}分钟`);
      this.setData({
        commute: { distanceKm, driveMin, transitMin, label, isRealTime: true }
      });
    }).catch(err => {
      console.warn("⚠️ 动态路线规划失败或 Key 欠费超限，已静默降级为球面估算结果:", err);
    });
  },

  switchTab(event) {