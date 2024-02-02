# Music-player 音乐播放器

## 一个集成了[APlayer(音乐播放器)](https://github.com/DIYgod/APlayer) + [MDUI(设置UI)](https://github.com/zdhxiong/mdui) + [jquery(文档操作)](https://github.com/jquery/jquery)
接入方法：在你的网站源码添加：
```html
<div id="musicPlayerContainer"></div>
<script src="https://api.now.cc/public/js/MusicPlayer/musicPlayerSettings/init.js"></script>
<button class="mdui-btn mdui-color-theme-accent mdui-ripple" mdui-dialog="{target: '#musicPlayerSettings'}">
    打开音乐播放器设置
</button>
```
