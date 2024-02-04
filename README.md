# Music-player 音乐播放器

[演示地址](https://www.xcccx.top/)

## 一个集成了[APlayer(音乐播放器)](https://github.com/DIYgod/APlayer) + [MDUI(设置UI)](https://github.com/zdhxiong/mdui) + [jquery(网页DOM操作)](https://github.com/jquery/jquery)
如何使用？
```html

<!-- 首先创建一个id="musicPlayerContainer"音乐播放器容器 -->
<div id="musicPlayerContainer"></div>

<!-- 引入init.js -->
<script src="https://api.now.cc/public/js/MusicPlayer/musicPlayerSettings/init.js"></script>

<!-- 然后在要打开设置的元素上添加 mdui-dialog="{target: '#musicPlayerSettings'}" -->
<button class="mdui-btn mdui-color-theme-accent mdui-ripple" mdui-dialog="{target: '#musicPlayerSettings'}">
    打开音乐播放器设置
</button>

<!-- 完成! -->
```
