var bmap = require('lib/bmap-wx.min');
App({

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  getTodayWeatherInfo:function(){
    var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'RmWk5VmUQfWxDGIKoGVymReAnK8m3Usw'
        });
        var fail = function(data) {
            console.log('fail!!!!')
        };
        var success = function(data) {
            console.log('success!!!');
            var weatherData = data.currentWeather[0];
            wx.setStorageSync("wAndLData", weatherData);
        }
        BMap.weather({
            fail: fail,
            success: success
        });

  },

  getWeatherInfo:function(location){
    const url = 'https://free-api.heweather.net/s6/weather/now?location='+location+'&key=b3c02403fbb446b497e5d05cbd8965dd';
    var that =this ;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        var data = res.data.HeWeather6[0].now;
        var basic = res.data.HeWeather6[0].basic;
        wx.setStorageSync("weatherInfo", data);
        wx.setStorageSync("locationBasic", basic);
      },
      fail:function(res){
        console.log("fail!!!");
      }
    })

  },

  getAirQuality:function(location){
    const url = 'https://free-api.heweather.net/s6/air/now?location='+location+'&key=b3c02403fbb446b497e5d05cbd8965dd'
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        var data = res.data.HeWeather6[0].air_now_city;
        wx.setStorageSync("airQuality", data);
      },
      fail:function(res){
        console.log("fail!!!");
      }
    })
  },

  getTodayTemData:function(location){
    const url = 'https://www.tianqiapi.com/api/?version=v9&appid=17294448%20&appsecret=9gotVvIm&city='+location;
    var that = this ;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        var data = res.data.data;
        wx.setStorageSync("temperatureData", data);
      },
      fail:function(res){
        console.log("fail!!!");
      }
    })
  }



})
