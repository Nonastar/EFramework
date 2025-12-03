import { ef } from "../../Plugins/EFramework/Framework";
import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { LevelPanel } from "./LevelPanel";


// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.View,
    prefab: "db://assets/Bundles/SuccessPanel.prafab",
    bundle: "UI",
})
export class SuccessPanel  extends UIPanelBase {
    
    onLoad() {
        super.onLoad();
        console.log("SuccessPanel loaded");
        this.nodeBind.RegisterClick("back", this.onClickBack, this);
        this.nodeBind.RegisterClick("repeat", this.onClickRepeat, this);
        this.nodeBind.RegisterClick("next", this.onClickNext, this);
    }

    onShow() {
        console.log("SuccessPanel shown");
        super.onShow();
    }

    private onClickBack() {
        ef.uiManager.closePanel(this);
        ef.uiManager.closePanel(LevelPanel);
    }

    private onClickRepeat() {
        ef.uiManager.closePanel(this);
        const panel = ef.uiManager.findPanel(LevelPanel);
        if (panel) {
            panel.onReset();
        }
    }

    private onClickNext() {
        ef.uiManager.closePanel(this);
        const panel = ef.uiManager.findPanel(LevelPanel);
        if (panel) {
            panel.onReset();
        }
    }

}