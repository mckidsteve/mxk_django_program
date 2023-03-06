- templates : 管理html
- urls : 管理路由
- views : 管理http
- models : 管理数据库数据
- static : 静态文件
  - css : 
  - js
  - img
  - audio
- consumers : 管理websocket


## *pr #1*:
``web.html`` : 支持多端运行兼容

1. load static:查找并载入静态文件夹
2. import jquery(js & css) & static(js & css)

``js update``:js render in client

``views & urls update``:run in server

``zzbase.js``:zip all js by scripts.sh


## *pr # 2*

- `css`: game.css -> the menu style
- `img` : playground.png
- `js`:
  - `zbase.js` : menu and playground zbase.js , add the constructor and listener
  - `scripts.sh`
- `temp/web.html` : web.html
- `urls`: index.py -> to link three page path
- `views`: index.py -> to render the page