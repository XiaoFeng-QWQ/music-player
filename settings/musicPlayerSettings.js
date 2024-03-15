/**
 * 更新音乐播放器
 * 
 */
function updateMusicPlayerConfig() {
    const config = musicPlayerConfiguration('read')
    const musicPlayerContainer = $('#music-player-container #meting-js')
    const metingJs = musicPlayerContainer.find('meting-js')
    const playerLrc = musicPlayerContainer.find('.aplayer-lrc')

    if (config.enable) {
        if (metingJs.length === 0) {
            //创建音乐播放器
            const musicPlayerHTML = `
                <meting-js
                    fixed="true"
                    preload="metadata"
                    mutex="true"
                    volume="0.3"
                    autotheme="false"
                    storage="AllFixed"
                    order="list"
                    server="${config.server}"
                    type="playlist"
                    id="${config.listId}"
                    autoplay="${config.autoplay}"
                >
                </meting-js>`
            musicPlayerContainer.html(musicPlayerHTML)
        } else {
            //更新音乐播放器属性
            metingJs.attr({
                'autoplay': config.autoplay,
                'server': config.server,
                'id': config.listId
            })
            playerLrc.css(config.lyricStyle)
        }
    } else {
        metingJs.remove()
    }
}

/**
 * 设置表单默认值
 * 
 */
function musicPlayerReadConfiguration() {

    const config = musicPlayerConfiguration('read')
    const lyricStyle = JSON.stringify(config.lyricStyle, null, 4); // 进行格式化

    $('#music-player-settings .music-playlist-switch').prop('checked', config.enable)
    $('#music-player-settings .music-playlist-autoplay').prop('checked', config.autoplay)
    $('#music-player-settings .music-playlist-id').val(config.listId)
    $('#music-player-settings .music-playlist-server').val(config.server)
    $('#music-player-settings .music-playlist-lyric-style').val(lyricStyle);

    //更新音乐播放器
    updateMusicPlayerConfig()
}

/**
 * 保存设置
 * 
 */
function musicPlayerSaveSettings() {
    const enable = $('#music-player-settings .music-playlist-switch').is(':checked')
    const autoplay = $('#music-player-settings .music-playlist-autoplay').is(':checked')
    const listId = $('#music-player-settings .music-playlist-id').val()
    const server = $('#music-player-settings .music-playlist-server').val()
    const lyricStyle = $('#music-player-settings .music-playlist-lyric-style').val();

    // 尝试解析 JSON，如果解析失败则抛出错误并提示用户
    if (typeof lyricStyle === 'string') {
        try {
            const lyricObjStyle = JSON.parse(lyricStyle);
            // 如果解析成功，可以将 lyricObjStyle 传入 musicPlayerConfiguration 进行保存
            if (typeof lyricObjStyle === 'object' && lyricObjStyle) {
                musicPlayerConfiguration('edit', [
                    ['enable', enable],
                    ['autoplay', autoplay],
                    ['listId', listId],
                    ['server', server],
                    ['lyricStyle', lyricObjStyle]
                ]);
                mdui.snackbar({
                    position: 'bottom',
                    message: '保存成功，如果不生效请刷新页面'
                });
                musicPlayerReadConfiguration();
            } else {
                mdui.snackbar({
                    position: 'bottom',
                    message: '样式属性格式错误，请检查后重新输入'
                });
            }
        } catch (error) {
            console.error(error);
            mdui.snackbar({
                position: 'bottom',
                message: `样式属性格式错误，请检查后重新输入 ${error}`
            });
        }
    } else {
        mdui.snackbar({
            position: 'bottom',
            message: '样式属性格式错误，请检查后重新输入'
        });
    }
}