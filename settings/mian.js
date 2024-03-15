$(function () {
    //初始化mdui组件
    new mdui.Select('#music-player-settings .music-playlist-server', {
        position: "bottom"
    })
    //读取音乐播放器配置
    musicPlayerReadConfiguration()

    $('#music-player-settings .music-playlist-version').html(`Version:${musicPlayerSettingsVersion}`)
})

/**
 * 检测更新
 * 
 */
function musicPlayerSettingsUpdate() {
    const upDataUrl = 'https://api.github.com/repos/XiaoFeng-QWQ/music-player/releases/latest'
    $.ajax({
        type: "GET",
        url: upDataUrl,
        dataType: "JSON",
        success: function (data) {
            $('#music-player-container #music-player-settings-update .mdui-dialog-content').html(`
                <p>
                    最新版本:
                    ${data.tag_name}
                <p>
                <hr>
                    <p>
                        <a href="${data.assets[0].browser_download_url}" target="_blank" rel="noopener noreferrer">下载链接</a>
                        <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">详情页</a>
                    </p>
                <hr>
                <p>
                    更新日志: 
                </p>
                ${data.body}
            `)
        },
        error: function (error) {
            console.table(error)
            $('#music-player-container #music-player-settings-update .mdui-dialog-content').html(`
            <p>
            检查更新失败: ${error.status} ${error.responseJSON.message}
            </p>
            `)
        }
    });
}
