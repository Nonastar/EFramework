import { ef } from "../Framework";
import { UIViewBase } from "./UIViewBase";

class UIPanelBase extends UIViewBase {
    public childPanelList: UIPanelBase[] = [];

    onLoad() {
        super.onLoad();
    }

    onShow(args?: any) {
        super.onShow(args);
    }

    onHide() {
        super.onHide();
    }

    onDestroy() {
        super.onDestroy();
    }

    onResume() {
        super.onResume();
    }

    onPause() {
        super.onPause();
    }

    openChildPanel<T extends UIPanelBase>(panel: T) {
        this.childPanelList.push(panel);
    }

    onClose(): void {
        console.log("UIPanelBase close");
        ef.uiManager.closePanel(this);
    }

    close(): void {
        this.childPanelList.forEach(v => ef.uiManager.closePanel(v));
        this.childPanelList = [];
    }
    
}

export { UIPanelBase };