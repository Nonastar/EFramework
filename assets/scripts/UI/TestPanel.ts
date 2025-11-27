import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";


// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.Common,
    prefab: "db://assets/resources/TestPanel1.prafab",
})
export class TestPanel extends UIPanelBase {
    
    onLoad() {
        super.onLoad();
        console.log("MainPanel loaded");

        this.nodeBind.ButtonRegister("Close", this.onClose, this);
    }

    onShow() {
        console.log("MainPanel shown");
        super.onShow();
    }
    
    onHide() {
        console.log("MainPanel hidden");
    }
}