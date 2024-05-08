<!--
 * @Author: xxl-007 1186479152@qq.com
 * @Date: 2024-05-08 11:45:25
 * @LastEditors: xxl-007 1186479152@qq.com
 * @LastEditTime: 2024-05-08 14:22:55
 * @FilePath: /mytestdemos/mydemos/vdemo1/src/views/exception/noauthority.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="not_authority">
            <img
                src="../../assets/img/noauth.svg"
                height="219"
                width="289"
            >
            <div class="content-wrap">
                <p class="text-error">抱歉，您没有权限访问该页面!
                <p class="text-error blue" @click="$router.push('/')">返回首页</p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .not_authority {
        text-align: center;
        height: 400px;
        width: 100%;
        margin: 150px auto 0;
        .content-wrap {
            margin-top: 11px;
            .text-error {
                color: #333;
                font-size: 14px;
                margin-bottom: 24px;
                opacity: 0.6;
                &.blue{
                    opacity: 1;
                    color: #3388ff;
                    cursor: pointer;
                    &:hover{
                        color: blue;
                    }
                }
            }
        }
    }
</style>