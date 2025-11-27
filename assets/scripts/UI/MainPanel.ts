import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { uiManager } from "../../Plugins/EFramework/UI/UIManager";
import { TestPanel } from "./TestPanel";
import { TestPane3 } from "./TestPanel3";
import { TestPane2 } from "./TestPanel2";


// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.Common,
    prefab: "db://assets/resources/MainPanel.prafab",
})
export class MainPanel extends UIPanelBase {
    
    onLoad() {
        super.onLoad();
        console.log("MainPanel loaded");

        this.nodeBind.ButtonRegister("Button", this.onClose, this);
        this.nodeBind.ButtonRegister("Button1", this.openPanel1, this);
        this.nodeBind.ButtonRegister("Button2", this.openPanel2, this);
        this.nodeBind.ButtonRegister("Button3", this.openPanel3, this);
    }

    onShow() {
        console.log("MainPanel shown");
        super.onShow();
    }

    openPanel1() {
        uiManager.open(TestPanel);
    }

    openPanel2() {
        uiManager.open(TestPane2);
    }

    openPanel3() {
        uiManager.open(TestPane3);
    }
    
    onHide() {
        console.log("MainPanel hidden");
    }
}