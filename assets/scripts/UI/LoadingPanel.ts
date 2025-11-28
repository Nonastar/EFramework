import { ProgressBar } from "cc";
import { UILayer } from "../../Plugins/EFramework/UI/UIConfig";
import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { ef } from "../../Plugins/EFramework/Framework";
import { MainPanel } from "./MainPanel";

@RegisterUI({
    layer: UILayer.View,
    prefab: "db://assets/Bundles/LoadingPanel.prafab",
    bundle: "UI",
})
export class LoadingPanel extends UIPanelBase {
    private _progress: ProgressBar;
    
    onLoad() {
        super.onLoad();
        this._progress = this.nodeBind.getNodeComponent<ProgressBar>("Slider");
        this._progress.progress= 0;
        console.log("LoadingPanel loaded");
    }

    onUpdate(deltaTime: number): void {
        this._progress.progress += deltaTime;
        if (this._progress.progress >= 1) {
            this.onClose();
            ef.uiManager.openPanel(MainPanel);
        }
    }
}