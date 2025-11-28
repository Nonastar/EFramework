import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";

// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.View,
    prefab: "db://assets/Bundles/LevelPanel.prafab",
    bundle: "UI",
})
export class LevelPanel extends UIPanelBase {
    
    onLoad() {
        super.onLoad();
        console.log("LevelPanel loaded");
        this.nodeBind.ButtonRegister("Close", this.onClose, this);
        this.nodeBind.ButtonRegister("Enter", this.onClickTips, this);
    }
    
    private onClickTips() : void {
        console.log("Click Tips");
    }

}