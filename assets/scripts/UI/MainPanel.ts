import { ef } from "../../Plugins/EFramework/Framework";
import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { ChooseLevelPanel } from "./ChooseLevelPanel";


// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.View,
    prefab: "db://assets/Bundles/MainPanel.prafab",
    bundle: "UI",
})
export class MainPanel extends UIPanelBase {
    
    onLoad() {
        super.onLoad();
        console.log("MainPanel loaded");

        this.nodeBind.ButtonRegister("Close", this.onClose, this);
        this.nodeBind.ButtonRegister("Enter", this.enterLevel, this);
    }

    onShow() {
        console.log("MainPanel shown");
        super.onShow();
    }

    private enterLevel() {
        ef.uiManager.openPanel(ChooseLevelPanel);
    }
    
    onHide() {
        console.log("MainPanel hidden");
    }
}