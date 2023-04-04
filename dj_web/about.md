# 1.有关于用户登录处理(前后端数据处理)

```
----------  Request   ----------
|        |----------->|        |
| Client |  Response  | Server |
|        |<-----------|        |
----------            ----------
```
> 前端
```views.py
前端:getinfo

from models.user import user
def getinfo_user(request):
    information = request.GET.get(request)
    return HTTPResponse
```

```urls.py
路由:
urlpatterns = [
    path("getinfo/" , getinfo , name = ""),
]
```

`请求:GET/POST -- 功能一致但似乎GET更不安全`

```前端.js
$.ajax({
    url:
    type:"GET",
    data:{},
    success : function(resp){
    }
})
```

> 后端
```views/login.py
def signin(request):
    data = request.GET
    username = data.get()
    password = data.get()
    user = authenticate(u=u,p=p) # 查询用户数据是否对的上
    if not:
        return 
    else:
        login
```
```views/logout.py
def signout(request):
    user = request.user
    if not :
        return
    else:logout
    return 
```
```urls/index.py
[
    path("login/",signin , name)
    path("logout/",signout,name)
]
```

# 多人联机的问题解决
### 对页面应对实际不同终端作不同的改变(如16:9的比例)

修改w,h等参数

### 理解async与await
> 并发 : 指两个或者多个事件在同一时间间隔内发生,例如一个时间段内的几个程序都在一个cpu上处于运行状态,但是任何一个时间点只有一个程序在运行

> 并行 : 指两个或者多个事件在同一个时刻发生,即多程序同时运行在多个cpu上

> 同步 : 指代码在IO操作时等待IO操作完成才返回

> 异步 : 指代码在IO操作时并不等待IO完成就返回

> 协程 : 可以理解为纯用户态的线程,通过协作而不是抢占来切换.相对于进程和协程,都可以在用户态完成,创建切换的消耗更低.例如:A->B->C->D , 我们暂停其中一个函数,在适当时候恢复函数继续执行


- async : 用于声明一个函数是异步函数,这能使得该函数在执行时挂起,然后可以去执行其它函数
- await : 用于声明程序挂起,比如一个异步程序执行时太慢,就选择将其挂起然后去执行其它的异步程序对象

### 使用django_channels来维护游戏的实时对局信息
```tips
http:是单向通信,是前端向后端发出请求,后端处理,返回结果给前端,但是后端不能主动发送信息
https:加密的http
ws:websocket双向通信
wss:加密ws
```
使用django_channels来支持wss协议

游戏数据的存储:
为了保证游戏的实时性,使用redis来存储,其效率比较高

安装:
- pip install channels_redis
- 配置asgi.py
- 配置settings.py
- 配置urls(wss://)
- 配置views
- 启动channels

要注意wss传输的是字符串