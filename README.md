# Music-player 音乐播放器 <br> 一个集成了[APlayer(音乐播放器)](https://github.com/DIYgod/APlayer) + [MDUI(设置UI)](https://github.com/zdhxiong/mdui) + [jquery(网页DOM操作)](https://github.com/jquery/jquery)

## [演示地址](https://www.dfggmc.top/)

![效果图](https://imag.xcccx.top/uploads/2024/02/04/65bf14fceb865.png)

## 如何使用？
```html

<!-- 任意元素加上 mdui-dialog="{target: '#music-player-settings'}" -->
<button class="mdui-btn mdui-color-theme-accent mdui-ripple" mdui-dialog="{target: '#music-player-settings'}">
    打开音乐播放器设置
</button>

<!-- 添加ID为 music-player-container 元素 -->
<div id="music-player-container"></div>

<!-- 引入js -->
<script src="mian.js"></script>
<script>
    // 新建类
    const musicPlayer = new MusicPlayerSettings();
    // 调用主函数
    musicPlayer.init();
</script>

<!-- 完成! -->
```

## 欢迎提交[issues](https://github.com/XiaoFeng-QWQ/music-player/issues)
