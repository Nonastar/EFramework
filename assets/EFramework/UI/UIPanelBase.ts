import { uiManager } from "./UIManager";
import { UIViewBase } from "./UIViewBase";

class UIPanelBase extends UIViewBase {
    public childPanelList: UIPanelBase[] = [];

    onLoad() {
        super.onLoad();
    }

    onShow() {
        super.onShow();
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
        uiManager.close(this);
    }

    close(): void {
        this.childPanelList.forEach(v => uiManager.close(v));
        this.childPanelList = [];
    }
    
}

export { UIPanelBase };