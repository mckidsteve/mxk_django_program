# The django program

## 项目简述
一个部署在网页端的小游戏项目
主要灵感来源yxc的django课程小项目,代码经过本地化调优可以较稳定的运行在edge112.0.1722.7 dev 64 位(windows10,21h2)上
其主要目的为了解django项目设计的基础架构,学习多态环境下由django后端驱动的js(es6标准)引擎所搭建的前端设计
目前基本完成了后端数据库连接,游戏py~js~html一体化引擎的构建

### 系统设计
- `menu` 菜单界面
- `playground` 游戏界面
- `setting` 设置界面

### 文件结构
- `templates` 管理html
- `urls` 管理路由
- `views` 管理http函数
- `models` 管理数据库数据
- `static` 管理静态文件
  - `css` 对象格式
  - `js` 对象逻辑(脚本)
  - `image` 图片
  - `audio` 声音
  - ...
- `consumers` 管理websocket函数

### 游玩方式
q键切换射弹,右键移动,左键射击
