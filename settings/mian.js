$(function () {
    //初始化mdui组件
    new mdui.Select('#musicPlayerSettings .musicServer', {
        position: "bottom"
    })

    //读取音乐播放器配置
    musicPlayerReadConfiguration()
})