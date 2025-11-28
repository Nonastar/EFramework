import { _decorator, Component } from 'cc';
import { ef } from "../Plugins/EFramework/Framework";
import { LoadingPanel } from './UI/LoadingPanel';

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
        ef.gameManager.addChildManager(ef.resourcesManager);
        ef.gameManager.addChildManager(ef.audioManager);
        ef.gameManager.addChildManager(ef.timerManager);
        ef.gameManager.addChildManager(ef.uiManager);

        ef.uiManager.onInit();
        ef.uiManager.openPanel(LoadingPanel);
    }

}


