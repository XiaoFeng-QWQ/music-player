# XQFMusicPlayer 音乐播放器 <br> 一个集成了[APlayer(音乐播放器)](https://github.com/DIYgod/APlayer) + 自定义设置

## [演示地址](https://www.dfggmc.top/)

![效果图](https://s21.ax1x.com/2025/07/20/pV8nm9K.png)

## 如何使用？
```html

<!-- 任意元素加上 id="XQFMusicPlayer-open-settings-btn" -->
<button id="XQFMusicPlayer-open-settings-btn">
    打开音乐播放器设置
</button>

<!-- 引入aplayerCSS -->
<link href="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.css" type="text/css" rel="stylesheet" />
<!-- 引入js -->
<script src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js"
    type="application/javascript"></script>
<script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.js"
    type="application/javascript"></script>
<script src="XQFMusicPlayerSettings.js"></script>
<!-- 或者通过JS控制 -->
<script>
    // 获取当前配置
    const config = XQFMusicPlayer.getConfig();

    // 更新配置
    XQFMusicPlayer.updateConfig({
        enable: true,
        listId: "123456",
        server: "tencent"
    });

    // // 销毁播放器
    XQFMusicPlayer.destroy();
</script>
<!-- 完成! -->
```

## 欢迎提交[issues](https://github.com/XiaoFeng-QWQ/music-player/issues)
