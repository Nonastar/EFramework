import { _decorator, Component } from 'cc';
import { GameManager } from '../EFramework/GameManager';
import { AudioManager } from '../EFramework/Audio/AudioManager';
import { TimerManager } from '../EFramework/Time/TimerManager';
import { ResourcesManager } from '../EFramework/Resources/ResourcesManager';
import { uiManager } from '../EFramework/UI/UIManager';
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
        gamemanager.addChildManager(AudioManager.instance);
        gamemanager.addChildManager(TimerManager.instance);
        gamemanager.addChildManager(ResourcesManager.instance);

        uiManager.open(MainPanel);
    }

}


