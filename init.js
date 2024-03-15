const musicPlayerSettingsVersion = '0.0.1-development'

//获取绝对路径
var js = document.scripts;
var scriptPath;
for (var i = js.length; i > 0; i--) {
    if (js[i - 1].src.indexOf("init.js") > -1) {
        scriptPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
    }
}

window.addEventListener('load', function () {
    let start = performance.now();

    //加载js，顺序不能反
    function loadScript(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false; // 这样可以保证按照顺序加载和执行脚本
        document.head.appendChild(script);
    }
    var scripts = [
        'https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js',
        'https://cdn.bootcdn.net/ajax/libs/mdui/1.0.2/js/mdui.min.js',
        'https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js',
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
    console.log(`%c Music player Settings Technical support provided by %c hhttps://github.com/XiaoFeng-QWQ Version:${musicPlayerSettingsVersion}`, "color: #fff; margin: 1em 0; padding: 5px 0; background: #00a9e0;", "margin: 1em 0; padding: 5px 0; background: #efefef;");
    console.warn('Do not deploy the development version to production!')
});