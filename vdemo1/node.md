<!--
 * @Author: xxl-007 1186479152@qq.com
 * @Date: 2024-05-09 10:54:07
 * @LastEditors: xxl-007 1186479152@qq.com
 * @LastEditTime: 2024-05-09 10:57:41
 * @FilePath: /mytestdemos/mydemos/vdemo1/node.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
node项目：希望它作为服务运行，这样即使你关闭了 SSH 会话，它也会继续运行。如何操作，以及如何停止服务

1、使用PM2
npm install -g pm2
pm2 start app.js
pm2 stop app.js
pm2 stop all

2、设置开机自启：
为了让你的应用在系统启动时自动运行，你可以使用PM2的save和startup命令：第一个命令会保存当前的进程列表，而第二个命令会配置PM2在系统启动时自动运行这些进程。
pm2 save 
pm2 startup


3、杀死进程: 作为最后的手段，你也可以直接杀死Node.js应用的进程。首先，你需要找到应用的进程ID（PID）：
ps aux | grep node
kill [PID]