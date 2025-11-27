import { Node } from "cc";
import { NodeBind } from "../Utiles/NodeBind";

class UIViewBase  {
    public node?: Node = null;
    protected nodeBind?: NodeBind = null;

    onLoad() {
    }
    
    onShow() {
        this.node.active = true;
    }

    bindNode(node: Node) {
        this.node = node;
        this.nodeBind = this.node.getComponent(NodeBind)
    }
    
    onHide() {
    }

    onClose() {

    }
    
    onDestroy() {
    }

    onResume() {
    }

    onPause() {
    }

    onFocus() {
    }
    
    onBlur() {
    }

    onBack() {
    }

    close() {
    }
}

export { UIViewBase };