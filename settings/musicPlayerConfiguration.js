/**
 * 读取或修改音乐播放器配置。
 * @param {string} method - 操作方法（'read' 或 'edit'）。
 * @param {string} [key] - 要读取或修改的配置项键名。
 * @param {*} [value] - 要修改的配置项值。
 */
function musicPlayerConfiguration(method, key, value) {
    /**
     * 获取当前的配置对象
     */
    function getConfig() {
        const cookieValue = document.cookie.replace(
            /(?:(?:^|.*;\s*)musicPlayerConfiguration\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        if (cookieValue !== undefined && cookieValue.trim() !== "") {
            try {
                return JSON.parse(cookieValue);
            } catch (error) {
                console.error("无法解析 cookie 中的 JSON 数据:", error);
                mdui.snackbar({
                    message: `<i class="mdui-icon material-icons">warning</i>无法解析 cookie 中的 JSON 数据:${error}`,
                });
            }
        } else {
            //返回默认值
            return {
                enable: true,
                autoplay: true,
                musicServer: "netease",
                playlistId: 2939725092,
            };
        }
    }

    /**
     * 将配置对象写入 cookie
     */
    function saveConfig(config) {
        const expiresDate = new Date();
        expiresDate.setFullYear(expiresDate.getFullYear() + 10);
        document.cookie = `musicPlayerConfiguration=${JSON.stringify(
            config
        )}; expires=${expiresDate.toUTCString()}`;
        //console.table(config);
    }

    // 获取当前的配置对象
    const config = getConfig();

    // 根据操作方法执行相应的操作
    switch (method) {
        // 读取配置
        case "read":
            // 如果提供了键名，则返回对应的值；否则返回整个配置对象
            if (key) {
                // 检查键是否存在于配置对象中
                if (config.hasOwnProperty(key)) {
                    return config[key];
                } else {
                    return null; // 返回默认值，表示配置项不存在
                }
            } else {
                return config;
            }

        // 修改配置
        case "edit":
            // 确保传入的键名是一个有效的字符串
            if (typeof key === "string") {
                // 检查键是否存在于配置对象中
                if (config.hasOwnProperty(key)) {
                    // 更新指定的配置项
                    config[key] = value;

                    // 将新的配置保存到 cookie 中
                    saveConfig(config);
                } else {
                    console.warn(`要修改的配置 ${key} 不存在`);
                }
            } else {
                console.error(`传递的键 ${key} 不是一个有效的字符串`);
            }
            break;

        // 无效的操作方法
        default:
            console.error("传递的方法不存在" + method);
            break;
    }
}
