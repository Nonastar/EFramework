import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { VirtualScrollView } from "../../Plugins/vscrollview/VScrollView";
import { ef } from "../../Plugins/EFramework/Framework";
import { LevelPanel } from "./LevelPanel";
import LevelLogic from "../Logic/LevelLogic";


// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.View,
    prefab: "db://assets/Bundles/ChooseLevelPanel.prafab",
    bundle: "UI",
})
export class ChooseLevelPanel extends UIPanelBase {
    private scrollView: VirtualScrollView;
    
    onLoad() {
        super.onLoad();
        this.scrollView = this.nodeBind.getNodeComponent("ScrollView", VirtualScrollView);
        this.scrollView.onItemClickFn = this.onclickItem.bind(this)
        console.log("ChooseLevelPanel loaded");
    }

    async onShow() {
        super.onShow();

        const levelCount = await LevelLogic.instance().getLevelCount()
        this.scrollView.setTotalCount(levelCount);
    }

    private onclickItem(item: any, index: number) {
        console.log("click item", index);
        ef.uiManager.openPanel(LevelPanel, index);
    }

}