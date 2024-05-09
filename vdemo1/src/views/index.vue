<template>
    <a-layout id="components-layout-demo-responsive">
        <a-layout-sider
            breakpoint="lg"
            collapsed-width="0"
            @collapse="onCollapse"
            @breakpoint="onBreakpoint"
            :style="{ overflow: 'auto', height: '100vh', position: 'relative', left: 0 }"
        >
            <div class="logo" />
            <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
                <a-menu-item key="1">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/about">表单 </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="upload" />
                    <span class="nav-text">nav 3</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <a-icon type="user" />
                    <span class="nav-text">nav 4</span>
                </a-menu-item>
                <a-menu-item key="5">
                    <a-icon type="video-camera" />
                    <span class="nav-text">nav 5</span>
                </a-menu-item>
                <a-menu-item key="6">
                    <a-icon type="video-camera" />
                    <span class="nav-text">nav 5</span>
                </a-menu-item>
                <a-menu-item key="7">
                    <a-icon type="video-camera" />
                    <span class="nav-text">nav 5</span>
                </a-menu-item>
                <a-menu-item key="8">
                    <a-icon type="video-camera" />
                    <span class="nav-text">nav 5</span>
                </a-menu-item>
                <a-menu-item key="9">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="10">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
                <a-menu-item key="11">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="12">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
                <a-menu-item key="13">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="14">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
                <a-menu-item key="15">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="16">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
                <a-menu-item key="17">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="18">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
                <a-menu-item key="19">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="20">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
                <a-menu-item key="21">
                    <router-link to="/home">home </router-link>
                </a-menu-item>
                <a-menu-item key="22">
                    <router-link to="/about">about </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="{ background: '#fff', padding: 0 }" />
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <div
                    :style="{
                        padding: '24px',
                        background: '#fff',
                        minHeight: 'calc(100vh - 168px)',
                        overflow: 'hidden',
                        textAlign: 'left',
                    }"
                >
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="textalign: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
    methods: {
        onCollapse(collapsed, type) {
            console.log(collapsed, type);
        },
        onBreakpoint(broken) {
            console.log(broken);
        },
    },
};
</script>

<style lang="less">
#components-layout-demo-responsive {
    height: 100%;
}
#components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>
