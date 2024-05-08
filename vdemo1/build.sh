#!/usr/bin/env bash
###
 # @Author: xxl-007 1186479152@qq.com
 # @Date: 2024-05-08 11:39:10
 # @LastEditors: xxl-007 1186479152@qq.com
 # @LastEditTime: 2024-05-08 11:39:51
 # @FilePath: /mytestdemos/mydemos/vdemo1/build.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 

# 保证你的build.sh脚本有任何错误就退出
set -e

# 保证你的字符集正确，如果是英文写en_US.UTF-8，如果是中文写zh_CN.UTF-8
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8

# NODEJS_BIN_LATEST: 最新版本，建议使用它。
# NODEJS_BIN_V{majer}: 我们会在该版本退出Node的LTS维护期时进行删除。
# 目前有: NODEJS_BIN_V6, NODEJS_BIN_V8, NODEJS_BIN_V10
#
# 添加下一行保证能够找到正确的Node和npm，以及yarn命令。
export PATH=$NODEJS_12_16_1_BIN:$YARN_1_22_4_BIN:$PATH

# 编译日志中打印Node和npm的版本。
echo "node: $(node -v)"
echo "npm: v$(npm -v)"

# 如果NODE_ENV为production, npm5以上版本就不会安装devDependencies。
# 所以，你先把它设置为development，保证你的devDependencies依赖也会被安装。
NODE_ENV=development npm install

# 添加下一行保证能够找到你使用npm install安装的工具（当然你如果使用npx，就不需要这一行）
export PATH=$(npm bin):$PATH

# 为生产环境构建加NODE_ENV=production.
# webpack, babel等工具会使用这个环境变量来决定会不会优化，所以再设置成production。
NODE_ENV=production npm run build

# 创建version文件
touch version

echo 'verson: '$version
echo $version > version

# 把version文件放到dist
cp -rf version dist

# 如果以上内容无法让你的编译成功，请你在当前这个页面的左侧导航中找到《如何在编译集群中调试》。
# 
tar -czf devsecops.tar.gz dist/*
cp devsecops.tar.gz ../output/
cp Dockerfile ../output/
cp nginx.conf ../output/

