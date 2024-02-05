var musicPlayerContainerInit = "";
musicPlayerContainerInit += "<link rel=\"stylesheet\" href=\"https:\/\/cdn.bootcdn.net\/ajax\/libs\/mdui\/1.0.2\/css\/mdui.min.css\">";
musicPlayerContainerInit += "<link rel=\"stylesheet\" href=\"https:\/\/cdn.staticfile.org\/aplayer\/1.10.1\/APlayer.min.css\">";
musicPlayerContainerInit += "";
musicPlayerContainerInit += "<div id=\"musicPlayerSettingsContent\">";
musicPlayerContainerInit += "<style>";
musicPlayerContainerInit += "#musicPlayerSettings {";
musicPlayerContainerInit += "	border-radius: 10px;";
musicPlayerContainerInit += "}";
musicPlayerContainerInit += "";
musicPlayerContainerInit += "#musicPlayerSettings .mdui-switch {";
musicPlayerContainerInit += "	height: 14.3;";
musicPlayerContainerInit += "}";
musicPlayerContainerInit += "";
musicPlayerContainerInit += "#musicPlayerSettings button {";
musicPlayerContainerInit += "	margin: 0.4rem;";
musicPlayerContainerInit += "}";
musicPlayerContainerInit += "";
musicPlayerContainerInit += "#musicPlayerSettings .mdui-icon {";
musicPlayerContainerInit += "	margin-right: 5px;";
musicPlayerContainerInit += "}";
musicPlayerContainerInit += "<\/style>";
musicPlayerContainerInit += "<div id=\"musicPlayerSettings\" class=\"mdui-dialog\">";
musicPlayerContainerInit += "<div class=\"mdui-dialog-title mdui-color-grey-900\"> <i class=\"mdui-icon material-icons\">queue_music<\/i>";
musicPlayerContainerInit += "	音乐播放器设置";
musicPlayerContainerInit += "<\/div>";
musicPlayerContainerInit += "<div class=\"musicPlayerSettingsContent mdui-dialog-content\">";
musicPlayerContainerInit += "	<ul class=\"mdui-list\">";
musicPlayerContainerInit += "		<p id=\"debug\"><\/p>";
musicPlayerContainerInit += "		<li class=\"mdui-list-item\">";
musicPlayerContainerInit += "			<i class=\"mdui-list-item-icon mdui-icon material-icons\">music_note<\/i>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-title\">音乐播放器开关<\/div>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-content\">";
musicPlayerContainerInit += "				<label class=\"mdui-switch\">";
musicPlayerContainerInit += "					<input class=\"music-playlist-switch\" name=\"music-playlist-switch\" type=\"checkbox\">";
musicPlayerContainerInit += "					<i class=\"mdui-switch-icon\"><\/i>";
musicPlayerContainerInit += "				<\/label>";
musicPlayerContainerInit += "			<\/div>";
musicPlayerContainerInit += "		<\/li>";
musicPlayerContainerInit += "		<li class=\"mdui-list-item\">";
musicPlayerContainerInit += "			<i class=\"mdui-list-item-icon mdui-icon material-icons\">play_arrow<\/i>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-title\">自动播放开关<\/div>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-content\">";
musicPlayerContainerInit += "				<label class=\"mdui-switch\">";
musicPlayerContainerInit += "					<input class=\"music-playlist-autoplay\" name=\"music-playlist-autoplay\"";
musicPlayerContainerInit += "						type=\"checkbox\">";
musicPlayerContainerInit += "					<i class=\"mdui-switch-icon\"><\/i>";
musicPlayerContainerInit += "				<\/label>";
musicPlayerContainerInit += "			<\/div>";
musicPlayerContainerInit += "		<\/li>";
musicPlayerContainerInit += "		<li class=\"mdui-list-item\"> <i";
musicPlayerContainerInit += "				class=\"mdui-list-item-icon mdui-icon material-icons\">wb_cloudy<\/i>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-title\">音乐平台<\/div>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-content\"> <select class=\"mdui-select musicServer\"";
musicPlayerContainerInit += "					name=\"musicServer\">";
musicPlayerContainerInit += "					<option value=\"netease\">网易云音乐（默认）<\/option>";
musicPlayerContainerInit += "					<option value=\"tencent\">QQ音乐<\/option>";
musicPlayerContainerInit += "					<option value=\"kugou\">酷狗音乐<\/option>";
musicPlayerContainerInit += "					<option value=\"xiami\">虾米音乐<\/option>";
musicPlayerContainerInit += "					<option value=\"baidu\">百度音乐<\/option>";
musicPlayerContainerInit += "				<\/select> <i class=\"mdui-select-icon\"><\/i> <\/div>";
musicPlayerContainerInit += "		<\/li>";
musicPlayerContainerInit += "		<li class=\"mdui-list-item\"> <i class=\"mdui-list-item-icon mdui-icon material-icons\">vpn_key<\/i>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-title\">音乐歌单ID<\/div>";
musicPlayerContainerInit += "			<div class=\"mdui-list-item-content music-playlist-id-input\"> <input";
musicPlayerContainerInit += "					class=\"mdui-textfield-input musicPlaylistId\" name=\"musicPlaylistId\" type=\"number\">";
musicPlayerContainerInit += "			<\/div>";
musicPlayerContainerInit += "		<\/li>";
musicPlayerContainerInit += "	<\/ul>";
musicPlayerContainerInit += "<\/div>";
musicPlayerContainerInit += "<div class=\"mdui-dialog-actions mdui-color-grey-100\"> <button";
musicPlayerContainerInit += "		class=\"mdui-btn mdui-ripple mdui-text-color-black-text\" mdui-dialog-confirm";
musicPlayerContainerInit += "		onclick=\"musicPlayerSaveSettings()\"> <i class=\"mdui-icon material-icons\">done_all<\/i> 保存配置并生效";
musicPlayerContainerInit += "	<\/button>";
musicPlayerContainerInit += "	<button class=\"mdui-btn mdui-ripple mdui-text-color-black-text\" mdui-dialog-cancel";
musicPlayerContainerInit += "		onclick=\"musicPlayerReadConfiguration()\"> <i class=\"mdui-icon material-icons\">cancel<\/i> 取消";
musicPlayerContainerInit += "	<\/button>";
musicPlayerContainerInit += "<\/div>";
musicPlayerContainerInit += "<\/div>";
musicPlayerContainerInit += "<\/div>";
musicPlayerContainerInit += "<div id=\"meting-js\"><\/div>";

window.addEventListener('load', function () {
    let start = performance.now();

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
        "MusicPlayer.js",
        "Meting.js",
        //音乐播放器设置
        "musicPlayerConfiguration.js",
        "musicPlayerSettings.js",
        "mian.js"
    ];
    scripts.forEach(function (src) {
        loadScript(src);
    });

    let end = performance.now();
    let duration = end - start;
    console.debug(`Music player execution time: ${duration.toFixed(3)} ms`);
    console.log("%c Music player Settings Technical support provided by https://github.com/XiaoFeng-QWQ %c", "color: #fff; margin: 1em 0; padding: 5px 0; background: #00a9e0;", "margin: 1em 0; padding: 5px 0; background: #efefef;");
});
