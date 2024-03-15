/**
 * musicPlayerConfiguration函数用于读取或修改音乐播放器的配置
 * @param {string} method - 操作类型，'read' 用于读取配置，'edit' 用于修改配置
 * @param {Array} data - 传递的数据，针对不同操作类型有不同的含义
 */
function musicPlayerConfiguration(method, data) {

    /**
     * 默认配置对象
     */
    const defaultConfig =
    {
        "enable": true,
        "autoplay": true,
        "listId": "2939725092",
        "server": "netease",
        "lyricStyle": null
    }

    /**
     * 保存配置
     * @param {Object} config - 待保存的配置对象
     */
    function saveConfig(config) {
        const expiresDate = new Date()
        expiresDate.setFullYear(expiresDate.getFullYear() + 10)
        console.table(config)
        document.cookie = `musicPlayerConfiguration=${JSON.stringify(config)}; expires=${expiresDate.toUTCString()}; path=/`
    }

    /**
     * 获取当前配置
     * @returns {Object} 当前配置对象
     */
    function getConfig() {
        const cookieValue = document.cookie.replace(
            /(?:(?:^|.*\s*)musicPlayerConfiguration\s*=\s*([^]*).*$)|^.*$/,
            "$1"
        )
        if (cookieValue !== undefined && cookieValue.trim() !== "") {
            try {
                return JSON.parse(cookieValue)
            } catch (error) {
                console.error("无法解析 cookie 中的 JSON 数据:", error)
                mdui.snackbar({
                    message: `<i class="mdui-icon material-icons">warning</i>无法解析 cookie 中的 JSON 数据:${error}`,
                })
            }
        } else {
            saveConfig(defaultConfig)
            //返回默认值
            return defaultConfig
        }
    }

    const config = getConfig()

    //根据传入参数读取或修改
    switch (method) {
        case "read":
            if (data) {
                if (Array.isArray(data)) {
                    const result = {}
                    // 遍历传入的键数组
                    data.forEach(key => {
                        // 如果配置中存在对应的键，则返回该键的值，否则返回undefined
                        result[key] = config.hasOwnProperty(key) ? config[key] : undefined
                    })
                    return result
                } else {
                    // 如果只传递一个键，则直接返回该键的值
                    return config.hasOwnProperty(data) ? config[data] : undefined
                }
            } else {
                // 如果没有传递任何参数，则返回整个配置对象
                return config
            }

        case "edit":
            // 遍历传入的键值对数组
            if (Array.isArray(data)) {
                data.forEach(([key, value]) => {
                    if (config.hasOwnProperty(key)) {
                        // 如果配置中存在对应的键，则修改对应键的值
                        config[key] = value
                    } else if (defaultConfig.hasOwnProperty(key)) {
                        // 如果配置中不存在对应的键，但默认配置中存在，则使用默认配置的值
                        config[key] = defaultConfig[key]
                    } else {
                        console.warn(`要修改的配置 ${key} 不存在`)
                    }
                })
                saveConfig(config)
                console.table(config)

                // 如果传递的数据是一个长度为2的数组，则将第一个元素作为键，第二个元素作为值
            } else if (data.length === 2) {
                const [key, value] = data
                if (config.hasOwnProperty(key)) {
                    // 如果配置中存在对应的键，则修改对应键的值
                    config[key] = value
                    saveConfig(config)
                    console.table(config)
                } else if (defaultConfig.hasOwnProperty(key)) {
                    // 如果配置中不存在对应的键，但默认配置中存在，则使用默认配置的值
                    config[key] = value
                    saveConfig(config)
                    console.table(config)
                } else {
                    console.warn(`要修改的配置 ${key} 不存在`)
                }
            } else {
                console.table(`传递的数据格式不正确 ${data}`)
            }
            break

        default:
            console.error("传递的方法不存在" + method)
            break
    }
}