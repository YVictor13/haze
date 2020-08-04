# 雾霾 app 探测系

> 雾霾的频繁出现已严重的影响到人们的出行，对人们的健康造成了重大影响。因此，能在出行前查看雾霾的指数，并采取相应的措施来把雾霾的影响降到最小就显得尤为重要。本系统在分析多种因子的影响下，设计一款微信端雾霾 app 探测系统。


## 二、要求
> 1.定位功能：将定位城市保存在服务器端，并同时显示在客户端。 
> 2.界面设计：包含显示天气和空气质量指数的动态显示。 
> 3.天气详情和空气质量指数：定位后的城市在服务器端获取后，传给天气详情界面，通过所传城市用百度天气 api 获取对应的天气详情和空气质量指数，并保存在服务器端。

## 探测方案
**完成此次的手机端雾霾探测系统，就要解决以下问题：**
- 采集用户的位置信息，即完成定位功能。
- 要有良好的界面设计、交互设计，即具备可用性、易用性以方便用户的使用。
- 要采集到天气信息。
**基于上述要求，我们设计了如下的探测方案：**
- 针对界面设计：选择使用wxml语言。主要目的是为了解决因为手机像素的不同，显示结果的不同，用wxml解决网页适配问题，使手机像素的大小不影响显示效果。主要部分为定位，即header部分，Body部分。Header部分包含天气状况展示以及定位、同时还有输入框，用于对地址的获取，从而展示不同的地址天气情况，Body部分包含显示空气质量指数的动态显示部分和未来7天天气温度折线图。
- 针对定位功能：通过百度地图api获取对应的定位源代码和请求接口，获取定位数据，将定位城市保存在服务器端，并同时显示在客户端。
- 针对天气的获取：天气详情和空气质量指数数据通过和风天气获取，利用百度地图、高德地图等可以辅助位置信息。
- 针对联想化输入功能：通过使用百度地图API获取输入数据，然后使用对应的API，联想化出输入地址的可能地址并展示给用户。
- 针对天气数据的动态显示：通过使用wx-chart组件，使用其中的折线图与饼状图，动态的显示温度折线图与天气质量图，让用户更好的获取到数据传达的意思。

## API调用\插件使用
> 百度地图（小程序API）
> 和天气天气质量API
> wx-charts 插件制作动态显示天气质量数据的图表

## 成品展示

![展示1](https://github.com/YVictor13/haze/blob/master/%E6%B5%8B%E8%AF%951.png)
![展示2](https://github.com/YVictor13/haze/blob/master/%E6%B5%8B%E8%AF%952.png)
![展示3](https://github.com/YVictor13/haze/blob/master/%E6%B5%8B%E8%AF%953.png)

## 动图展示

<video id="video" controls="" preload="none" poster="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.jpg">
<source id="mp4" src="https://github.com/YVictor13/haze/blob/master/%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA.mp4" type="video/mp4">
</video>
