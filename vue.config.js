module.exports = {
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                "appId": "com.xiaohuihui.app",
                "productName": "项目清单-小灰灰", //项目名，也是生成的安装文件名，即demo.exe
                "copyright": "Copyright © 2021", //版权信息
                "directories": {
                    "output": "./build" //输出文件路径
                },
                "asar": true,
                "dmg": {
                    "contents": [{
                        "x": 410,
                        "y": 150,
                        "type": "link",
                        "path": "/Applications"
                    },
                        {
                            "x": 130,
                            "y": 150,
                            "type": "file"
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./public/icon.ico", // 安装图标
                    "uninstallerIcon": "./public/icon.ico", //卸载图标
                    "installerHeaderIcon": "./public/icon.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true, // 创建开始菜单图标
                    "shortcutName": "项目清单-小灰灰", // 图标名称
                },
                "win": { //win相关配置
                    "icon": "./public/icon.ico", //图标，当前图标在根目录下，注意这里有两个坑
                    "target": [{
                        "target": "nsis", //利用nsis制作安装程序
                        "arch": [
                            "x64", //64位
                            "ia32" //32位
                        ]
                    }]
                },
                "mac": {
                    "icon": './public/icon.icns'
                }
            }
        }
    }
}