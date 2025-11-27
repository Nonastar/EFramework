import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";

export class TestPane3 extends UIPanelBase {
    
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