# Music-player 音乐播放器 <br> 一个集成了[APlayer(音乐播放器)](https://github.com/DIYgod/APlayer) + [MDUI(设置UI)](https://github.com/zdhxiong/mdui) + [jquery(网页DOM操作)](https://github.com/jquery/jquery)

## [演示地址](https://www.xcccx.top/)

![效果图](https://imag.xcccx.top/uploads/2024/02/04/65bf14fceb865.png)

## 如何使用？
```html

<!-- 首先创建一个id="musicPlayerContainer"音乐播放器容器 -->
<div id="musicPlayerContainer"></div>

<!-- 引入初始化init.js -->
<script src="init.js"></script>

<!-- 然后在要打开设置的元素上添加 mdui-dialog="{target: '#musicPlayerSettings'}" -->
<button class="mdui-btn mdui-color-theme-accent mdui-ripple" mdui-dialog="{target: '#musicPlayerSettings'}">
    打开音乐播放器设置
</button>

<!-- 完成! -->
```

## 欢迎提交[issues](https://github.com/XiaoFeng-QWQ/music-player/issues)
