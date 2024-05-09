<template>
    <div >  
        <br />
        <div>
            数字滚动：<roll-number
                number-value="1920"
                :anim-duration="200"
            />
        </div>
        <br />
        <!-- <v-scale-screen width="1000" height="200" style="background: #fff;">
            <img src="@/assets/a.png" alt="" style="width: 500px;">
        </v-scale-screen> -->

        <div>
            <a-button @click="copyToClipboard('点击复制我')">点击复制我</a-button>
        </div>
    </div>
</template>

<script>
// npm install --save @inotom/vue-roll-number
import { RollNumber } from '@inotom/vue-roll-number';
import VScaleScreen from 'v-scale-screen'
export default {
    components: {
        RollNumber,
        VScaleScreen
    },
    methods: {
        async copyToClipboard(text) {
            console.log('text', text);
            // 创建一个临时的textarea元素
            const el = document.createElement('textarea');
            // 设置textarea的内容为我们要复制的文本
            el.value = text;
            // 将临时元素添加到文档中
            document.body.appendChild(el);
            // 选中textarea中的文本
            el.select();
            // 执行复制命令
            let result;
            try {
                result = document.execCommand('copy');
                if (result) {
                    this.$message.success('复制成功');
                }
            } catch (err) {
                console.error('无法复制文本: ', err);
                this.$message.error('复制失败');
            } finally {
                // 无论复制是否成功，最后都要从文档中移除临时元素
                document.body.removeChild(el);
            }
            // 方法不兼容
            // try {
            //     // 如果你的应用需要在不支持navigator.clipboard的环境中工作
            //     // 考虑实现一个回退策略，如使用document.execCommand('copy')（
            //     // 尽管这已被标记为过时，但在某些旧浏览器中仍然可用）。
            //     // document.execCommand('copy')
            //     await navigator.clipboard.writeText(text);
            //     this.$message.success('复制成功');
            // } catch (err) {
            //     console.log('Error in copying text: ' + err);
            //     this.$message.error('复制失败');
            // }
        }
    }
}
</script>

<style>

</style>