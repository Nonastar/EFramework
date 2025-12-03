import { UIManager } from "./UI/UIManager";
import { GameManager } from "./GameManager";
import { TimerManager } from "./Time/TimerManager";
import { AudioManager } from "./Audio/AudioManager";
import { ResourcesManager } from "./Resources/ResourcesManager";
//import { EventManager } from "./Event/EventManager";
//import { SceneManager } from "./Scene/SceneManager";
import Singleton from "./Utiles/Singleton";

// 懒加载的全局Manager实例
export const ef = {
    get gameManager() {
        return GameManager.instance;
    },

    get uiManager() {
        return UIManager.instance();
    },
    get timerManager() {
        return TimerManager.instance();
    },
    get audioManager() {
        return AudioManager.instance();
    },
    get resourcesManager() {
        return ResourcesManager.instance();
    },
    /* get event() {
        return EventManager.instance();
    },
    get scene() {
        return SceneManager.instance();
    }, */

    // 导出Singleton类

    // GameManager特殊处理（需要手动初始化）

};

// 导出Manager类，方便直接使用
export {
    Singleton,
};
