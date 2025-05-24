


const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';


const getUniqueIdentifier = () => {
    if (IS_DEV) {
        return 'com.yourname.stickersmash.dev';
    }

    if (IS_PREVIEW) {
        return 'com.yourname.stickersmash.preview';
    }

    return 'com.yourname.stickersmash';
};


const getAppName = () => {
    if (IS_DEV) {
        return 'StickerSmash (Dev)';
    }

    if (IS_PREVIEW) {
        return 'StickerSmash (Preview)';
    }

    return 'StickerSmash: Emoji Stickers';
};


export default {
    "expo": {
        "name": getAppName(),
        "slug": "gym-partner",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/power.png",
        "scheme": "myapp",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "supportsTablet": true,
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/png.png",
                "backgroundColor": "#ffffff"
            },
            "package": "com.dbenahmed.gympartner"
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./assets/images/png.png"
        },
        "plugins": [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/png.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#ffffff"
                }
            ],
            "expo-secure-store"
        ],
        "experiments": {
            "typedRoutes": true
        }, "extra": {
            "eas": {
                "projectId": "3caab429-933b-4fcf-a0a4-7c07b47610dd"
            },
            "BACKEND_URL": process.env.BACKEND_URL,
            "PORT": process.env.PORT,
        }
    }
};
