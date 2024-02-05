/**
 * 更新音乐播放器配置
 * 
 */
function updateMusicPlayerConfig() {
    const isEnabled = musicPlayerConfiguration('read', 'enable');
    const $musicPlayerContainer = $('#musicPlayerContainer #meting-js');
    const $metingJs = $musicPlayerContainer.find('meting-js');

    if (isEnabled) {
        // 检测是否存在，如果不存在则创建
        if ($metingJs.length === 0) {
            const musicPlayerHTML = `
                <meting-js
                    fixed="true"
                    preload="metadata"
                    mutex="true"
                    volume="0.3"
                    autotheme="false"
                    storage="AllFixed"
                    order="list"
                    server="${musicPlayerConfiguration('read', 'musicServer')}"
                    type="playlist"
                    id="${musicPlayerConfiguration("read", "playlistId")}"
                    autoplay="${musicPlayerConfiguration('read', 'autoplay')}"
                >
                </meting-js>`;
            $musicPlayerContainer.html(musicPlayerHTML);
        } else {
            // 如果存在，则更新属性
            $metingJs.attr({
                'autoplay': musicPlayerConfiguration('read', 'autoplay'),
                'server': musicPlayerConfiguration('read', 'musicServer'),
                'id': musicPlayerConfiguration("read", "playlistId")
            });
        }
    } else {
        //删除播放器
        $metingJs.remove();
    }
}

/**
 * 读取配置并设置表单函数
 * 
 */
function musicPlayerReadConfiguration() {
    const config = {
        enable: musicPlayerConfiguration('read', 'enable'),
        autoplay: musicPlayerConfiguration('read', 'autoplay'),
        musicServer: musicPlayerConfiguration('read', 'musicServer'),
        playlistId: musicPlayerConfiguration("read", "playlistId")
    };

    $('#musicPlayerSettings .music-playlist-switch').prop('checked', config.enable);
    $('#musicPlayerSettings .music-playlist-autoplay').prop('checked', config.autoplay);
    $('#musicPlayerSettings .musicServer').val(config.musicServer);
    $('#musicPlayerSettings .musicPlaylistId').val(config.playlistId);

    updateMusicPlayerConfig();
}

/**
 * 保存设置
 * 
 */
function musicPlayerSaveSettings() {
    musicPlayerConfiguration('edit', 'enable', $('#musicPlayerSettings .music-playlist-switch').is(':checked'));
    musicPlayerConfiguration('edit', 'autoplay', $('#musicPlayerSettings .music-playlist-autoplay').is(':checked'));
    musicPlayerConfiguration('edit', 'musicServer', $('#musicPlayerSettings .musicServer').val());

    const playlistId = $('#musicPlayerSettings .musicPlaylistId').val();
    if (playlistId) {
        musicPlayerConfiguration('edit', 'playlistId', playlistId);
        musicPlayerReadConfiguration();
        mdui.snackbar({
            position: 'bottom',
            message: '保存成功，如果不生效请刷新页面'
        });
    } else {
        mdui.snackbar({
            message: `歌单ID不能为空，歌单ID未被保存`
        });
    }
}
