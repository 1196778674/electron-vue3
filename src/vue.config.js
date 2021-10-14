// vue.config.js
module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          // options placed here will be merged with default configuration and passed to electron-builder
          "appId": "com.contract",
          "productName": "工具",
          "copyright": "Copyright © 2021 xiaohuihui",
          "directories": {
            "buildResources": "build"
          },
          "mac": {
            "category": "public.app-category.utilities"
          },
          "dmg": {
            "background": "build/background.jfif",
            "icon": "build/icons/icon.icns",
            "iconSize": 100,
            "contents": [
              {
                "x": 380,
                "y": 180,
                "type": "link",
                "path": "/Applications"
              },
              {
                "x": 130,
                "y": 180,
                "type": "file"
              }
            ],
            "window": {
              "width": 540,
              "height": 380
            }
          },
          "win": {
            "target": [
              "msi",
              "zip",
              "nsis"
            ],
            "icon": "build/icons/icon.ico"
          },
          "nsis": {
            "oneClick": false,
            "language": "2052",
            "perMachine": true,
            "allowToChangeInstallationDirectory": true,
            "createDesktopShortcut": true, // 创建桌面图标
            "createStartMenuShortcut": true, // 创建开始菜单图标
            "shortcutName": '工具' // 图标名称
          }
        }
      }
    }
  }
  