import { Node ,js} from "cc";
import { NodeBind } from "../Utiles/NodeBind";
import ELogger from "../Utiles/ELogger";

class UIViewBase  {
    public node: Node = null;
    protected nodeBind?: NodeBind = null;

    private log ;
    protected get logger() {
        return this.log? this.log : (this.log = new ELogger(js.getClassName(this)));
    }

    protected set logger(value: ELogger) {
        this.log = value;
    }

    onLoad() {
    }
    
    onShow(args?: any) {
        this.node.active = true;
    }

    bindNode(node: Node) {
        this.node = node;
        this.nodeBind = this.node.getComponent(NodeBind)
    }

    onUpdate?(deltaTime: number) : void
    onLateUpdate?(deltaTime: number) : void
    
    onHide?() : void

    onClose?() : void
    
    onDestroy?() : void

    onResume?() : void

    onPause?() : void

    
}

export { UIViewBase };