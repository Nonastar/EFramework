import { _decorator, Component } from 'cc';
import { GameManager } from '../Plugins/EFramework/GameManager';
import { AudioManager } from '../Plugins/EFramework/Audio/AudioManager';
import { TimerManager } from '../Plugins/EFramework/Time/TimerManager';
import { ResourcesManager } from '../Plugins/EFramework/Resources/ResourcesManager';
import { uiManager } from '../Plugins/EFramework/UI/UIManager';
import { MainPanel } from './UI/MainPanel';

const { ccclass, property } = _decorator;

/*
 * onLoad
 * onEnable
 * start
 * update
 * lateUpdate
 * onDisable
 * onDestroy
 */

@ccclass('GameInit')
export class GameInit extends Component {
    start() {
        const gamemanager = GameManager.instance;
        gamemanager.addChildManager(AudioManager.instance());
        gamemanager.addChildManager(TimerManager.instance());
        gamemanager.addChildManager(ResourcesManager.instance());

        uiManager.open(MainPanel);
    }

}


