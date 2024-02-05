var musicPlayerContainerInit = `
<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/mdui/1.0.2/css/mdui.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.css">

<div id="musicPlayerSettingsContent">
<style>
#musicPlayerSettings {
	border-radius: 10px;
}

#musicPlayerSettings .mdui-switch {
	height: 14.3;
}

#musicPlayerSettings button {
	margin: 0.4rem;
}

#musicPlayerSettings .mdui-icon {
	margin-right: 5px;
}
</style>
<div id="musicPlayerSettings" class="mdui-dialog">
<div class="mdui-dialog-title mdui-color-grey-900"> <i class="mdui-icon material-icons">queue_music</i>
	音乐播放器设置
</div>
<div class="musicPlayerSettingsContent mdui-dialog-content">
	<ul class="mdui-list">
		<p id="debug"></p>
		<li class="mdui-list-item">
			<i class="mdui-list-item-icon mdui-icon material-icons">music_note</i>
			<div class="mdui-list-item-title">音乐播放器开关</div>
			<div class="mdui-list-item-content">
				<label class="mdui-switch">
					<input class="music-playlist-switch" name="music-playlist-switch" type="checkbox">
					<i class="mdui-switch-icon"></i>
				</label>
			</div>
		</li>
		<li class="mdui-list-item">
			<i class="mdui-list-item-icon mdui-icon material-icons">play_arrow</i>
			<div class="mdui-list-item-title">自动播放开关</div>
			<div class="mdui-list-item-content">
				<label class="mdui-switch">
					<input class="music-playlist-autoplay" name="music-playlist-autoplay"
						type="checkbox">
					<i class="mdui-switch-icon"></i>
				</label>
			</div>
		</li>
		<li class="mdui-list-item"> <i
				class="mdui-list-item-icon mdui-icon material-icons">wb_cloudy</i>
			<div class="mdui-list-item-title">音乐平台</div>
			<div class="mdui-list-item-content"> <select class="mdui-select musicServer"
					name="musicServer">
					<option value="netease">网易云音乐（默认）</option>
					<option value="tencent">QQ音乐</option>
					<option value="kugou">酷狗音乐</option>
					<option value="xiami">虾米音乐</option>
					<option value="baidu">百度音乐</option>
				</select> <i class="mdui-select-icon"></i> </div>
		</li>
		<li class="mdui-list-item"> <i class="mdui-list-item-icon mdui-icon material-icons">vpn_key</i>
			<div class="mdui-list-item-title">音乐歌单ID</div>
			<div class="mdui-list-item-content music-playlist-id-input"> <input
					class="mdui-textfield-input musicPlaylistId" name="musicPlaylistId" type="number">
			</div>
		</li>
	</ul>
</div>
<div class="mdui-dialog-actions mdui-color-grey-100"> <button
		class="mdui-btn mdui-ripple mdui-text-color-black-text" mdui-dialog-confirm
		onclick="musicPlayerSaveSettings()"> <i class="mdui-icon material-icons">done_all</i> 保存配置并生效
	</button>
	<button class="mdui-btn mdui-ripple mdui-text-color-black-text" mdui-dialog-cancel
		onclick="musicPlayerReadConfiguration()"> <i class="mdui-icon material-icons">cancel</i> 取消
    </button>
</div>
</div>
</div>
<div id="meting-js"></div>
`;

//获取正确的相对（绝对）路径
var scriptElement = document.currentScript;
var scriptUrl = scriptElement.src;
var scriptPath = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));
//Debug
//console.debug("Debug:当前模块脚本的URL：" + scriptPath);

window.addEventListener('load', function () {
    let start = performance.now();

    //生成音乐播放器元素
    var element = document.getElementById('musicPlayerContainer');
    element.innerHTML = musicPlayerContainerInit;

    //加载js，顺序不能反
    function loadScript(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false; // 这样可以保证按照顺序加载和执行脚本
        document.head.appendChild(script);
    }
    var scripts = [
        "https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js",
        "https://cdn.bootcdn.net/ajax/libs/mdui/1.0.2/js/mdui.min.js",
        "https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js",
        //生成音乐播放器
        `${scriptPath}/musicPlayer/MusicPlayer.js`,
        `${scriptPath}/musicPlayer/Meting.js`,
        //音乐播放器设置
        `${scriptPath}/settings/musicPlayerConfiguration.js`,
        `${scriptPath}/settings/musicPlayerSettings.js`,
        `${scriptPath}/settings/mian.js`
    ];
    scripts.forEach(function (src) {
        loadScript(src);
    });

    let end = performance.now();
    let duration = end - start;
    console.debug(`Music player execution time: ${duration.toFixed(3)} ms`);
    console.log("%c Music player Settings Technical support provided by https://github.com/XiaoFeng-QWQ %c", "color: #fff; margin: 1em 0; padding: 5px 0; background: #00a9e0;", "margin: 1em 0; padding: 5px 0; background: #efefef;");
});
