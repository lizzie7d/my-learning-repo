1. websocket
   是 H5 提供的在 web 应用程序中客户端和服务器之间进行的非 HTTP 的通信机制。

2. 实时的，永久的。
   这意味着当服务器想向客户端发送数据时，可以立即将数据推送到客户端的浏览器中，无需再重新建立连接。只要客户端有一个被打开的 socket 与服务器连接，服务器就会把数据发送到这个 socket 中，服务器不需要再轮询客户端的请求，从被动转为主动。

3. websocket API
   --- 建立 websocket 对象，参数是 url，url 是 ws 或者 wss 开头
   var ws = new WebSocket("ws://localhost:8080/socket")

   --- 发送数据，websocket 只能发送文本数据，如果是对象的话，必须得转成文本数据再发送。
   ws.send("客户端发送的请求")

   --- 通过 onopen 事件来监听 websocket 的连接状态
   ws.open=function(event){
   //开始通信时的处理
   }

   --- 通过获取 onmessage 事件来获取服务器端发送过来的数据
   ws.onmessage = function(event){
   console.log(event.data)
   }

   --- 通过 onclose 事件句柄来监听 websockets 的关闭状况
   ws.onmessage = function(event){
   console.log(event.data)
   }
