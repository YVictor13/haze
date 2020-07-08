var app = getApp() ;
var wxCharts = require('../../lib/wxcharts.js');
var bmap = require('../../lib/bmap-wx.min.js');
var ringChart = null;
var lineChart = null;
Page({
    data: {
        weatherData: {},
        weatherInfo:{},
        airQualityData:{},
        locationBasic:{},
        temperatureData:[],
        humidityList:[],
        sugData: '',
        isShow:false,
        isSearch:false,
        hidden: true,
        list: [],
        scrollTop: 0,
        scrollHeight: 0,
        inputVal:'',
    },

    onLoad: function() {
        var that = this ;
        // 设置滑动高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                scrollHeight: res.windowHeight ,
                inputVal:''
                });
            }
        });
        var wAndLData = wx.getStorageSync('wAndLData');
        var locationBasic = wx.getStorageSync('locationBasic');
        var weatherInfo = wx.getStorageSync('weatherInfo');
        var airQualityData = wx.getStorageSync('airQuality');
        var temperatureData = wx.getStorageSync('temperatureData');
        that.setData({
            weatherData:wAndLData,
            weatherInfo:weatherInfo,
            airQualityData:airQualityData,
            locationBasic:locationBasic,
            temperatureData:temperatureData
        })  
        that.onReady();
    },

    scroll: function (event) {
        this.setData({
          scrollTop: event.detail.scrollTop
        });
      },

    topLoad:function(e){
        var that =this;
        var val = that.data.inputVal;
        if(val === ''){
            that.onLoad();
        }else{
            app.getWeatherInfo(val);
            app.getAirQuality(val);
            var locationBasic = wx.getStorageSync('locationBasic');
            if(locationBasic === ''){
                wx.showModal({
                        title: '查询无果',
                        content: '查询地址无效',
                        showCancel:false,
                        success (res) {
                        if (res.confirm) {
                            return ;
                        }
                    }
                });
            }
            app.getTodayTemData(locationBasic.location);
            var weatherInfo = wx.getStorageSync('weatherInfo');
            var airQualityData = wx.getStorageSync('airQuality');
            var temperatureData = wx.getStorageSync('temperatureData');
            that.setData({
                weatherInfo:weatherInfo,
                airQualityData:airQualityData,
                locationBasic:locationBasic,
                temperatureData:temperatureData,
                sugData: '',
                isShow:false,
                isSearch:true,
                inputVal:val
            })
             that.onReady();
        }
    },

    touchHandler: function (e) {
        lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },

    createSimulationTemData: function () {
        var categories = [0,0,0,0,0,0,0];
        var data = [0,0,0,0,0,0,0];
        var that = this ; 
        for(var i in that.data.temperatureData){
            categories[i]=that.data.temperatureData[i].day;
            data[i] = parseFloat(that.data.temperatureData[i].tem);
        }
        return {
            categories: categories,
            data: data
        }
    },

    confirmInput:function(e){
        var that = this;
        var val = e.detail.value;
        console.log(val);
        if(val ===''){
            wx.showModal({
                title: '提示',
                content: '输入不能为空',
                showCancel:false,
                success (res) {
                if (res.confirm) {
                    that.setData({
                        sugData: '',
                        isShow:false,
                        inputVal:''
                    })
                }
            }
        })
    }else{    
        app.getWeatherInfo(val);
        app.getAirQuality(val);
        var locationBasic = wx.getStorageSync('locationBasic');
        if(locationBasic === ''){
            wx.showModal({
                    title: '查询无果',
                    content: '查询地址无效',
                    showCancel:false,
                    success (res) {
                    if (res.confirm) {
                        return ;
                    }
                }
            });
        }
        app.getTodayTemData(locationBasic.location);
        var weatherInfo = wx.getStorageSync('weatherInfo');
        var airQualityData = wx.getStorageSync('airQuality');
        var temperatureData = wx.getStorageSync('temperatureData');
        that.setData({
            weatherInfo:weatherInfo,
            airQualityData:airQualityData,
            locationBasic:locationBasic,
            temperatureData:temperatureData,
            sugData: '',
             isShow:false,
             isSearch:true,
             inputVal:val
        })
        }
    },

    bindKeyInput: function(e) {
        var that = this;
        if (e.detail.value === '') {
            that.setData({
                sugData: '',
                isShow:false
            });
            return;
        }else{
            that.setData({
                isShow:true
            });
        }
        var BMap = new bmap.BMapWX({
            ak: 'RmWk5VmUQfWxDGIKoGVymReAnK8m3Usw'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            var sugData = '';
            for(var i = 0; i < data.result.length; i++) {
                sugData = sugData + data.result[i].name + '\n';
            }
            that.setData({
                sugData: sugData
            });
        }
        BMap.suggestion({
            query: e.detail.value,
            region: '北京',
            city_limit: true,
            fail: fail,
            success: success
        });
    },

    onReady: function (e) {

        var that = this;
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        // 环形图
        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 25,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                name: that.data.airQualityData.aqi+'('+that.data.airQualityData.qlty+')',
                color: '#7cb5ec',
                fontSize: 12
            },
            subtitle: {
                name: '空气质量指数',
                color: '#666666',
                fontSize: 12
            },
            series: [{
                name: 'PM10 : '+that.data.airQualityData.pm10,
                data: parseFloat(that.data.airQualityData.pm10),
            }, {
                name: 'PM2.5 : '+that.data.airQualityData.pm25,
                data: parseFloat(that.data.airQualityData.pm25),
            }, {
                name: 'SO2 : '+that.data.airQualityData.so2,
                data: parseFloat(that.data.airQualityData.so2),
            }, {
                name: 'NO2 : '+that.data.airQualityData.no2,
                data: parseFloat(that.data.airQualityData.no2), 
            },{
                name: 'CO : '+that.data.airQualityData.co,
                data: parseFloat(that.data.airQualityData.co),
            },{
                name: 'O3 : '+that.data.airQualityData.o3,
                data: parseFloat(that.data.airQualityData.o3),
            }],
            disablePieStroke: true,
            width: windowWidth,
            height: 220,
            dataLabel: false,
            legend: true,
            background: '#f5f5f5',
            padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 500);

        // 条形图
        var simulationTemData = this.createSimulationTemData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationTemData.categories,
            animation: true,
            background: '#f5f5f5',
            series: [{
                name: '温度',
                data: simulationTemData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '温度 (摄氏度)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });

    }
})