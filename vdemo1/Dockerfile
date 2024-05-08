# 随便拉一个nginx镜像
FROM nginx:stable-alpine

MAINTAINER OneQQ "wanqian01@baidu.com"

# nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 前端文件
COPY dist /usr/share/nginx/html
