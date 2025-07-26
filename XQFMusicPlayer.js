/**
 * XQFMusicPlayer - 多合一音乐播放器组件
 */
class XQFMusicPlayer {
    constructor(options = {}) {
        this.VERSION = "v1.0.0.0";
        this.DEBUG = false;
        // 默认配置
        this.defaultConfig = {
            enable: true,
            autoplay: false,
            listId: "2939725092",
            server: "netease",
            syncTitle: false,
            lyricStyle: {
                fontSize: '16px',
                color: '#333',
                activeColor: '#4285f4',
                height: '40px',
                bottom: '20px'
            },
            container: "#XQFMusicPlayer-container"
        };

        this.options = { ...this.defaultConfig, ...options };
        this.player = null;
        // 原始页面标题（用于恢复）
        this.originalTitle = document.title;
        this.titleUpdateTimer = null;
        this.init();
        this.log(
            `音乐播放器设置由 https://github.com/XiaoFeng-QWQ 提供技术支持\nMusic player is set to provide technical support by https://github.com/XiaoFeng-QWQ\n Version 版本: ${this.VERSION} `,
        );
        console.log(
            `%c音乐播放器设置由 https://github.com/XiaoFeng-QWQ 提供技术支持\nMusic player is set to provide technical support by https://github.com/XiaoFeng-QWQ\n%c Version 版本: %c ${this.VERSION} `,
            'color: #3eaf7c; font-size: 16px;line-height:30px;',
            'background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff',
            'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',
        )
    }

    /**
     * 打印调试信息
     * @param {...any} args - 要打印的参数
     */
    log(...args) {
        if (this.DEBUG) {
            console.debug(new Date() + '[XQFMusicPlayer DEBUG]', ...args);
        }
    }

    /**
     * 打印错误信息
     * @param {...any} args - 要打印的参数
     */
    error(...args) {
        if (this.DEBUG) {
            console.error(new Date() + '[XQFMusicPlayer ERROR]', ...args);
        }
    }

    /**
     * 初始化音乐播放器
     */
    init() {
        this.log('开始初始化音乐播放器');
        this.loadConfig();
        this.log('配置加载完成:', this.options);
        this.createDOM();
        this.log('DOM结构创建完成');
        this.initUI();
        this.log('UI初始化完成');
        this.initEvents();
        this.log('事件监听初始化完成');
        this.updatePlayer();
        this.log('播放器更新完成');
    }

    /**
     * 创建DOM结构
     */
    createDOM() {
        this.log('开始创建DOM结构');
        // 主容器
        this.container = $(this.options.container);
        if (this.container.length === 0) {
            this.container = $('<div id="XQFMusicPlayer-container"></div>').appendTo('body');
            this.log('创建了新的容器元素');
        }
        const style = `
            .XQFMusicPlayer-container{font-family:Arial,sans-serif;max-width:800px;margin:0 auto}
            .XQFMusicPlayer-dialog{border:none;padding:0;box-shadow:0 4px 12px rgba(0,0,0,0.15);width:90%;max-width:500px}
            .XQFMusicPlayer-dialog::backdrop{background-color:rgba(0,0,0,0.5)}
            .XQFMusicPlayer-dialog-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding:20px 20px 10px;border-bottom:1px solid #eee}
            .XQFMusicPlayer-dialog-title{font-size:18px;font-weight:bold;display:flex;align-items:center;gap:8px}
            .XQFMusicPlayer-dialog-close{background:none;border:none;font-size:20px;cursor:pointer;padding:0;margin:0}
            .XQFMusicPlayer-dialog-content{padding:0 20px;margin-bottom:20px}
            .XQFMusicPlayer-settings-item{margin-bottom:15px}
            .XQFMusicPlayer-settings-label{display:block;margin-bottom:5px;font-weight:bold}
            .XQFMusicPlayer-settings-input{width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box}
            .XQFMusicPlayer-settings-textarea{width:100%;height:100px;padding:8px;border:1px solid #ddd;border-radius:4px;resize:vertical;box-sizing:border-box}
            .XQFMusicPlayer-dialog-footer{display:flex;justify-content:flex-end;gap:10px;padding:10px 20px;background-color:#f9f9f9;border-radius:0 0 8px 8px}
            .XQFMusicPlayer-dialog-btn{padding:8px 16px;border:none;border-radius:4px;cursor:pointer;font-weight:bold}
            .XQFMusicPlayer-dialog-btn-primary{background-color:#4285f4;color:white}
            .XQFMusicPlayer-dialog-btn-secondary{background-color:#f1f1f1;color:#333}
            .XQFMusicPlayer-switch{position:relative;display:inline-block;width:50px;height:24px}
            .XQFMusicPlayer-switch input{opacity:0;width:0;height:0}
            .XQFMusicPlayer-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:24px}
            .XQFMusicPlayer-slider:before{position:absolute;content:"";height:16px;width:16px;left:4px;bottom:4px;background-color:white;transition:.4s;border-radius:50%}
            .XQFMusicPlayer-switch input:checked + .XQFMusicPlayer-slider{background-color:#4285f4}
            .XQFMusicPlayer-switch input:checked + .XQFMusicPlayer-slider:before{transform:translateX(26px)}
            .XQFMusicPlayer-open-settings{padding:8px 16px;background-color:#4285f4;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;margin:10px 0}
            .XQFMusicPlayer-message{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:4px;color:white;font-weight:bold;z-index:1001;opacity:0;transition:opacity 0.3s}
            .XQFMusicPlayer-message.success{background-color:#4CAF50;opacity:1}
            .XQFMusicPlayer-message.error{background-color:#F44336;opacity:1}
        `;
        $('head').append(`<style>${style}</style>`);
        this.log('CSS样式添加完成');

        this.container.html(`
            <div id="XQFMusicPlayer-player-container"></div>
            <dialog class="XQFMusicPlayer-dialog" id="XQFMusicPlayer-settings-dialog">
                <div class="XQFMusicPlayer-dialog-header">
                    <div class="XQFMusicPlayer-dialog-title">
                        <span>音乐播放器设置</span>
                        <span class="XQFMusicPlayer-version"></span>
                    </div>
                    <button class="XQFMusicPlayer-dialog-close" id="XQFMusicPlayer-close-settings-btn">×</button>
                </div>
                <div class="XQFMusicPlayer-dialog-content">
                    <div class="XQFMusicPlayer-settings-item">
                        <label class="XQFMusicPlayer-settings-label">音乐播放器开关</label>
                        <label class="XQFMusicPlayer-switch">
                            <input type="checkbox" class="XQFMusicPlayer-enable-switch">
                            <span class="XQFMusicPlayer-slider"></span>
                        </label>
                    </div>
                    <div class="XQFMusicPlayer-settings-item">
                        <label class="XQFMusicPlayer-settings-label">自动播放开关</label>
                        <label class="XQFMusicPlayer-switch">
                            <input type="checkbox" class="XQFMusicPlayer-autoplay-switch">
                            <span class="XQFMusicPlayer-slider"></span>
                        </label>
                    </div>
                    <div class="XQFMusicPlayer-settings-item">
                        <label class="XQFMusicPlayer-settings-label">同步播放状态到标题</label>
                        <label class="XQFMusicPlayer-switch">
                            <input type="checkbox" class="XQFMusicPlayer-sync-title-switch">
                            <span class="XQFMusicPlayer-slider"></span>
                        </label>
                    </div>
                    <div class="XQFMusicPlayer-settings-item">
                        <label class="XQFMusicPlayer-settings-label">音乐平台</label>
                        <select class="XQFMusicPlayer-settings-input XQFMusicPlayer-server-select">
                            <option value="netease">网易云音乐（默认）</option>
                            <option value="tencent">QQ音乐</option>
                        </select>
                    </div>
                    <div class="XQFMusicPlayer-settings-item">
                        <label class="XQFMusicPlayer-settings-label">音乐歌单ID</label>
                        <input type="text" class="XQFMusicPlayer-settings-input XQFMusicPlayer-playlist-id" placeholder="请输入歌单ID">
                    </div>
                    <div class="XQFMusicPlayer-settings-item">
                        <label class="XQFMusicPlayer-settings-label">自定义歌词样式(JSON格式)</label>
                        <textarea class="XQFMusicPlayer-settings-textarea XQFMusicPlayer-lyric-style" placeholder='{"background-color":"#98bf21","top": "30px"}'></textarea>
                    </div>
                </div>
                <div class="XQFMusicPlayer-dialog-footer">
                    <button class="XQFMusicPlayer-dialog-btn XQFMusicPlayer-dialog-btn-secondary" id="XQFMusicPlayer-cancel-settings-btn">取消</button>
                    <button class="XQFMusicPlayer-dialog-btn XQFMusicPlayer-dialog-btn-secondary" id="XQFMusicPlayer-about-btn">关于</button>
                    <button class="XQFMusicPlayer-dialog-btn XQFMusicPlayer-dialog-btn-primary" id="XQFMusicPlayer-save-settings-btn">保存配置</button>
                </div>
            </dialog>
            
            <dialog class="XQFMusicPlayer-dialog" id="XQFMusicPlayer-about-dialog">
                <div class="XQFMusicPlayer-dialog-header">
                    <div class="XQFMusicPlayer-dialog-title">
                        <span>关于 XQFMusicPlayer</span>
                    </div>
                    <button class="XQFMusicPlayer-dialog-close" id="XQFMusicPlayer-close-about-btn">×</button>
                </div>
                <div class="XQFMusicPlayer-dialog-content">
                    <p><strong>版本:</strong> ${this.VERSION}</p>
                    <p><strong>作者:</strong> XiaoFeng-QWQ</p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/XiaoFeng-QWQ/music-player" target="_blank">https://github.com/XiaoFeng-QWQ/music-player</a></p>
                    
                    <h3>License</h3>
                    <p>This program is free software: you can redistribute it and/or modify
                    it under the terms of the <strong>GNU General Public License</strong> as published by
                    the Free Software Foundation, either version 3 of the License, or
                    (at your option) any later version.</p>
                    
                    <h3>Third-party Libraries</h3>
                    <ul>
                        <li><strong>jQuery</strong> - MIT License</li>
                        <li><strong>APlayer</strong> - MIT License</li>
                    </ul>
                    
                    <p>This program is distributed in the hope that it will be useful,
                    but WITHOUT ANY WARRANTY; without even the implied warranty of
                    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
                    GNU General Public License for more details.</p>
                    
                    <p>You should have received a copy of the GNU General Public License
                    along with this program. If not, see <a href="https://www.gnu.org/licenses/" target="_blank">https://www.gnu.org/licenses/</a>.</p>
                </div>
                <div class="XQFMusicPlayer-dialog-footer">
                    <button class="XQFMusicPlayer-dialog-btn XQFMusicPlayer-dialog-btn-secondary" id="XQFMusicPlayer-back-to-settings-btn">返回设置</button>
                </div>
            </dialog>
        `);
        this.log('播放器HTML结构创建完成');
    }

    /**
     * 从cookie加载配置
     */
    loadConfig() {
        this.log('开始从cookie加载配置');
        const cookieValue = document.cookie.replace(
            /(?:(?:^|.*;\s*)XQFMusicPlayerConfiguration\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        if (cookieValue) {
            try {
                const savedConfig = JSON.parse(cookieValue);
                this.options = { ...this.options, ...savedConfig };
                this.log('从cookie成功加载配置:', savedConfig);
            } catch (error) {
                this.error('解析cookie配置失败:', error);
            }
        } else {
            this.log('未找到cookie配置，使用默认配置');
        }
    }

    /**
     * 保存配置到cookie
     */
    saveConfig() {
        this.log('保存配置到cookie:', this.options);
        const expiresDate = new Date();
        expiresDate.setFullYear(expiresDate.getFullYear() + 10);
        document.cookie = `XQFMusicPlayerConfiguration=${JSON.stringify(this.options)}; expires=${expiresDate.toUTCString()}; path=/`;
    }

    /**
     * 初始化UI元素
     */
    initUI() {
        this.log('开始初始化UI元素');
        this.playerContainer = $('#XQFMusicPlayer-player-container');
        this.settingsDialog = document.getElementById('XQFMusicPlayer-settings-dialog');
        this.aboutDialog = document.getElementById('XQFMusicPlayer-about-dialog');
        this.log('UI元素初始化完成');
    }

    /**
     * 初始化事件监听
     */
    initEvents() {
        this.log('开始初始化事件监听');
        $('#XQFMusicPlayer-open-settings-btn').click(() => this.openSettings());
        $('#XQFMusicPlayer-close-settings-btn, #XQFMusicPlayer-cancel-settings-btn').click(() => this.closeSettings());
        $('#XQFMusicPlayer-save-settings-btn').click(() => this.saveSettings());
        $('#XQFMusicPlayer-about-btn').click(() => this.openAboutDialog());
        $('#XQFMusicPlayer-close-about-btn, #XQFMusicPlayer-back-to-settings-btn').click(() => this.closeAboutDialog());
        this.log('事件监听初始化完成');
    }

    /**
     * 打开设置对话框
     */
    openSettings() {
        this.log('打开设置对话框');
        document.body.style.overflow = 'hidden';
        // 填充当前设置
        $('.XQFMusicPlayer-enable-switch').prop('checked', this.options.enable);
        $('.XQFMusicPlayer-autoplay-switch').prop('checked', this.options.autoplay);
        $('.XQFMusicPlayer-sync-title-switch').prop('checked', this.options.syncTitle);
        $('.XQFMusicPlayer-server-select').val(this.options.server);
        $('.XQFMusicPlayer-playlist-id').val(this.options.listId);
        $('.XQFMusicPlayer-lyric-style').val(JSON.stringify(this.options.lyricStyle, null, 2));
        $('.XQFMusicPlayer-version').text(`${this.VERSION}`);

        this.settingsDialog.showModal();
    }

    /**
     * 关闭设置对话框
     */
    closeSettings() {
        this.log('关闭设置对话框');
        document.body.style.overflow = '';
        this.settingsDialog.close();
    }

    /**
     * 打开关于对话框
     */
    openAboutDialog() {
        this.log('打开关于对话框');
        document.body.style.overflow = 'hidden';
        this.aboutDialog.showModal();
        this.settingsDialog.close();
    }

    /**
     * 关闭关于对话框
     */
    closeAboutDialog() {
        this.log('关闭关于对话框');
        document.body.style.overflow = '';
        this.aboutDialog.close();
        this.openSettings();
    }

    /**
     * 保存设置
     */
    saveSettings() {
        this.log('开始保存设置');
        try {
            const oldServer = this.options.server;
            const oldListId = this.options.listId;
            const oldSyncTitle = this.options.syncTitle; // 保存旧的syncTitle值

            this.options.enable = $('.XQFMusicPlayer-enable-switch').is(':checked');
            this.options.autoplay = $('.XQFMusicPlayer-autoplay-switch').is(':checked');
            this.options.syncTitle = $('.XQFMusicPlayer-sync-title-switch').is(':checked');
            this.options.server = $('.XQFMusicPlayer-server-select').val();
            this.options.listId = $('.XQFMusicPlayer-playlist-id').val();

            this.log('获取的表单值:', {
                enable: this.options.enable,
                autoplay: this.options.autoplay,
                syncTitle: this.options.syncTitle,
                server: this.options.server,
                listId: this.options.listId
            });

            const lyricStyle = $('.XQFMusicPlayer-lyric-style').val();
            if (lyricStyle) {
                this.options.lyricStyle = JSON.parse(lyricStyle);
                this.log('解析后的歌词样式:', this.options.lyricStyle);
            }

            this.saveConfig();

            // 只有在音乐平台或歌单ID改变时才需要重新创建播放器
            if (oldServer !== this.options.server || oldListId !== this.options.listId) {
                this.updatePlayer();
            } else {
                // 否则只需要应用歌词样式
                this.applyLyricStyle();

                // 检查syncTitle是否发生变化
                if (oldSyncTitle !== this.options.syncTitle) {
                    if (this.options.syncTitle) {
                        this.initTitleUpdater();
                    } else {
                        // 关闭标题同步
                        if (this.titleUpdateTimer) {
                            clearInterval(this.titleUpdateTimer);
                            this.titleUpdateTimer = null;
                        }
                        // 恢复原始标题
                        document.title = this.originalTitle;
                    }
                }
            }

            this.closeSettings();
            this.showMessage('设置已保存');
        } catch (error) {
            this.error('保存设置失败:', error);
            this.showMessage(`保存失败: ${error.message}`, 'error');
        }
    }

    /**
     * 显示消息
     * @param {string} message - 要显示的消息
     * @param {string} type - 消息类型 ('success' 或 'error')
     */
    showMessage(message, type = 'success') {
        this.log(`显示消息: ${type} - ${message}`);
        const messageBox = $(`<div class="XQFMusicPlayer-message ${type}">${message}</div>`);
        $('body').append(messageBox);
        // 自动消失
        setTimeout(() => {
            messageBox.fadeOut(() => messageBox.remove());
        }, 3000);
    }

    /**
     * 更新播放器
     */
    updatePlayer() {
        this.log('开始更新播放器');
        // 清除现有播放器(防止更新设置后无效)
        if (this.player) {
            this.log('清除现有播放器');
            // 移除事件监听器
            if (this.player.timeupdateListener) {
                this.player.audio.removeEventListener('timeupdate', this.player.timeupdateListener);
            }
            if (this.player.playListener) {
                this.player.audio.removeEventListener('play', this.player.playListener);
            }
            if (this.player.pauseListener) {
                this.player.audio.removeEventListener('pause', this.player.pauseListener);
            }
            this.player.destroy();
            this.player = null;
            // 清除标题更新定时器
            if (this.titleUpdateTimer) {
                clearInterval(this.titleUpdateTimer);
                this.titleUpdateTimer = null;
            }
            // 恢复原始标题
            document.title = this.originalTitle;
        }

        // 如果播放器被禁用，直接返回
        if (!this.options.enable) {
            this.log('播放器被禁用，清空容器');
            this.playerContainer.empty();
            return;
        }

        // 创建播放器容器
        this.playerContainer.html('<div id="XQFMusicPlayer-aplayer"></div>');
        this.log('创建播放器容器');

        // 初始化APlayer
        this.player = new APlayer({
            container: document.getElementById('XQFMusicPlayer-aplayer'),
            fixed: true,
            preload: 'metadata',
            mutex: true,
            volume: 0.3,
            autotheme: false,
            storageName: 'XQFMusicPlayer',
            order: 'list',
            lrcType: 3, // 启用歌词功能
            audio: [{
                name: '加载中...',
                artist: '请稍候',
                url: '',
                cover: 'https://s21.ax1x.com/2025/07/20/pV8PDWd.png',
                lrc: ''
            }]
        });

        this.log('APlayer初始化完成');

        // 保存监听器引用以便后续移除
        this.player.timeupdateListener = () => {
            this.savePlaybackProgress();
        };

        this.player.playListener = () => {
            this.onPlayerPlay();
        };

        this.player.pauseListener = () => {
            this.onPlayerPause();
        };

        this.player.audio.addEventListener('timeupdate', this.player.timeupdateListener);
        this.player.audio.addEventListener('play', this.player.playListener);
        this.player.audio.addEventListener('pause', this.player.pauseListener);
        this.log('添加了事件监听器');

        // 监听歌曲切换
        this.player.on('listswitch', (index) => {
            this.log('歌曲切换到索引:', index);
            // 延迟保存以确保切换完成
            setTimeout(() => {
                this.savePlaybackProgress();
            }, 100);
            if (this.options.syncTitle) {
                this.updateTitle();
            }
        });

        // 应用歌词样式
        this.applyLyricStyle();

        // 加载音乐列表
        this.loadMusicList();

        // 初始化标题更新
        if (this.options.syncTitle) {
            this.initTitleUpdater();
        }
    }

    /**
     * 初始化标题更新器
     */
    initTitleUpdater() {
        // 清除现有定时器
        if (this.titleUpdateTimer) {
            clearInterval(this.titleUpdateTimer);
        }
        // 设置定时更新标题
        this.titleUpdateTimer = setInterval(() => {
            this.updateTitle();
        }, 1000);
        // 初始更新
        this.updateTitle();
    }

    /**
     * 更新页面标题
     */
    updateTitle() {
        if (!this.player || !this.options.syncTitle) return;
        const currentAudio = this.player.list.audios[this.player.list.index];
        if (!currentAudio) return;
        const progress = this.formatTime(this.player.audio.currentTime) +
            ' / ' +
            this.formatTime(this.player.audio.duration);
        document.title = `${currentAudio.name} - ${currentAudio.artist} | ${progress} | ${this.originalTitle}`;
    }

    /**
     * 格式化时间
     * @param {number} seconds 秒数
     * @return {string} 格式化后的时间字符串
     */
    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * 播放器播放事件处理
     */
    onPlayerPlay() {
        if (this.options.syncTitle) {
            this.updateTitle();
        }
    }

    /**
     * 播放器暂停事件处理
     */
    onPlayerPause() {
        if (this.options.syncTitle) {
            this.updateTitle();
        }
    }

    /**
     * 保存当前播放进度到localStorage
     */
    savePlaybackProgress() {
        if (!this.player || !this.player.audio) return;
        const progress = {
            currentTime: this.player.audio.currentTime,
            currentIndex: this.player.list.index,
            playlistId: this.options.listId,
            server: this.options.server,
            timestamp: Date.now()
        };
        localStorage.setItem('XQFMusicPlayer_PlaybackProgress', JSON.stringify(progress));
        this.log('保存播放进度:', progress);
    }

    /**
     * 应用歌词样式
     */
    applyLyricStyle() {
        if (!this.player || !this.options.lyricStyle) return;
        const lyricElement = $('#XQFMusicPlayer-aplayer .aplayer-lrc');
        if (lyricElement.length) {
            lyricElement.css(this.options.lyricStyle);
            // 确保歌词容器可见
            lyricElement.show();
            // 设置歌词行高
            const lineHeight = this.options.lyricStyle.height || '40px';
            lyricElement.find('p').css('line-height', lineHeight);
            this.log('歌词样式已应用:', this.options.lyricStyle);
        }
    }

    /**
     * 加载音乐列表
     */
    loadMusicList() {
        const apiUrl = `https://v.iarc.top/?server=${this.options.server}&type=playlist&id=${this.options.listId}&r=${Math.random()}`;
        this.log('开始加载音乐列表，API URL:', apiUrl);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.log('收到音乐列表API响应:', data);
                if (data && data.length > 0) {
                    // 1. 先保存当前的播放进度
                    const savedProgress = localStorage.getItem('XQFMusicPlayer_PlaybackProgress');
                    let restoreProgress = null;
                    if (savedProgress) {
                        try {
                            restoreProgress = JSON.parse(savedProgress);
                            this.log('从localStorage加载的播放进度:', restoreProgress);
                        } catch (error) {
                            this.error('解析保存的进度失败:', error);
                        }
                    }
                    // 2. 清空并更新播放列表
                    this.player.list.clear();
                    this.log('清空现有播放列表');
                    const songs = data.map(song => {
                        if (!song.lrc) {
                            song.lrc = `[00:00.00]${song.name} - ${song.artist}`;
                        }
                        return song;
                    });
                    this.player.list.add(songs);
                    this.log('添加了新的歌曲列表，共', songs.length, '首歌曲');
                    // 3. 设置恢复进度的回调函数
                    const restorePlayback = () => {
                        this.log('尝试恢复播放进度');
                        if (restoreProgress &&
                            restoreProgress.playlistId === this.options.listId &&
                            restoreProgress.server === this.options.server) {
                            // 确保索引有效
                            if (restoreProgress.currentIndex >= 0 &&
                                restoreProgress.currentIndex < this.player.list.audios.length) {
                                this.log('恢复播放进度: 索引', restoreProgress.currentIndex, '时间', restoreProgress.currentTime);
                                // 切换到上次播放的歌曲
                                this.player.list.switch(restoreProgress.currentIndex);
                                // 等待歌曲加载完成
                                const checkAudioReady = () => {
                                    if (this.player.audio.duration > 0) {
                                        // 设置播放位置
                                        const seekTime = Math.min(
                                            restoreProgress.currentTime,
                                            this.player.audio.duration - 1
                                        );
                                        this.player.audio.currentTime = seekTime;
                                        // 如果配置了自动播放，就播放
                                        if (this.options.autoplay) {
                                            this.player.play();
                                        }
                                    } else {
                                        // 还没准备好，继续等待
                                        setTimeout(checkAudioReady, 100);
                                    }
                                };
                                checkAudioReady();
                            } else if (this.options.autoplay) {
                                // 索引无效但需要自动播放
                                this.player.play();
                            }
                        } else if (this.options.autoplay) {
                            // 没有可恢复的进度但需要自动播放
                            this.player.play();
                        }
                    };

                    // 如果已经有歌曲加载完成，直接恢复
                    if (this.player.list.audios.length > 0 && this.player.audio) {
                        restorePlayback();
                    } else {
                        // 否则等待歌曲加载事件
                        this.player.on('canplay', restorePlayback);
                    }
                } else {
                    this.error('音乐列表为空或API返回无效数据');
                    this.showMessage('无法加载音乐列表，请检查歌单ID是否正确', 'error');
                }
            })
            .catch(error => {
                this.error('加载音乐列表失败:', error);
                this.showMessage('加载音乐列表失败: ' + error.message, 'error');
            });
    }

    /**
     * 获取当前配置
     * @return {Object} 当前配置
     */
    getConfig() {
        this.log('获取当前配置');
        return { ...this.options };
    }

    /**
     * 更新配置
     * @param {Object} newConfig - 新的配置
     */
    updateConfig(newConfig) {
        this.log('更新配置:', newConfig);
        this.options = { ...this.options, ...newConfig };
        this.saveConfig();
        this.updatePlayer();
    }

    /**
     * 销毁播放器
     */
    destroy() {
        this.log('销毁播放器');
        if (this.player) {
            // 移除事件监听器
            if (this.player.timeupdateListener) {
                this.player.audio.removeEventListener('timeupdate', this.player.timeupdateListener);
            }
            if (this.player.playListener) {
                this.player.audio.removeEventListener('play', this.player.playListener);
            }
            if (this.player.pauseListener) {
                this.player.audio.removeEventListener('pause', this.player.pauseListener);
            }
            this.player.destroy();
        }

        // 清除标题更新定时器
        if (this.titleUpdateTimer) {
            clearInterval(this.titleUpdateTimer);
            this.titleUpdateTimer = null;
        }
        // 恢复原始标题
        document.title = this.originalTitle;
        // 移除所有添加的DOM元素
        this.container.remove();
        // 移除样式
        $('style').filter((_, el) => el.textContent.includes('XQFMusicPlayer')).remove();
    }
}

$(document).ready(() => {
    if (!$('#XQFMusicPlayer-container').length) {
        window.XQFMusicPlayer = new XQFMusicPlayer();
    }
});