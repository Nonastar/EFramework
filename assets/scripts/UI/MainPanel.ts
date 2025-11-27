import { Button, EventHandheld, EventHandler } from "cc";
import { UILayer, UIMaskType } from "../../EFramework/UI/UIConfig";
import { UIPanelBase } from "../../EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../EFramework/UI/UIRegistry";


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
    }
    
    onClickButton() {
        console.log("MainPanel button clicked 0");
    }

    onClickButton1() {
        console.log("MainPanel button clicked 1");
    }
    
    onShow() {
        console.log("MainPanel shown");
    }
    
    onHide() {
        console.log("MainPanel hidden");
    }
}