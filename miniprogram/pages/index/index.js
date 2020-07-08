var app = getApp()
Page({

  data: {
    homeUrl:'../home/home'

  },

  onLoad:function(){
    app.getTodayWeatherInfo();
    var wAndLData = wx.getStorageSync('wAndLData');
    app.getTodayWeatherInfo();
    app.getWeatherInfo(wAndLData.currentCity);
    app.getAirQuality(wAndLData.currentCity);
    var locationBasic = wx.getStorageSync('locationBasic');
    app.getTodayTemData(locationBasic.location);
  },
  login:function(){
    this.onLoad();
    wx.navigateTo({
      url:this.data.homeUrl
    })
  }

})