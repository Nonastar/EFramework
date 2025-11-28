import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { VirtualScrollView } from "../../Plugins/vscrollview/VScrollView";
import { ef } from "../../Plugins/EFramework/Framework";
import { LevelPanel } from "./LevelPanel";

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
        this.scrollView.onItemClickFn = this.onclickItem
        console.log("ChooseLevelPanel loaded");
    }

    onShow(): void {
        super.onShow();

        this.scrollView.setTotalCount(10);
    }

    private onclickItem(item: any, index: number) {
        console.log("click item", index);
        ef.uiManager.openPanel(LevelPanel);
    }
}