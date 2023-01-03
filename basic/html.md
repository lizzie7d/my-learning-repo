1. HTML 语义化
   =>易懂/有助于爬虫抓取更多的有效信息，爬虫依赖于标签/没有 CSS 样式下, 页面也可以呈现很好地内容结构

 <footer></footer> <header>

2. script 标签中 defer 和 async 的区别
script：阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 html
<script async> 解析HTML过程中进行脚本的异步下载，下载成功立马执行，有可能阻断HTML的解析。
<script defer> 完全不会阻碍HTML的解析，解析完成之后再按照顺序执行脚本


3. DNS 域名解析 => 在浏览器输入网址后，首先要经过域名解析，因为浏览器不能直接通过域名找到对应服务器，而是通过 IP 地址。
   DNS 域名解析为递归查询和迭代查询
