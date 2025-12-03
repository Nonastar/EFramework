import { EventTouch, Node, UITransform } from "cc";
import { NodeBind } from "../../Plugins/EFramework/Utiles/NodeBind";

export class MarkItem {
    private node: Node = null;
    private bindNode: NodeBind = null;
    public isShow: boolean = false;
    public clickCallback: () => void;

    constructor(mark: Node) {
        this.node = mark;
        this.bindNode = mark.getComponent(NodeBind);
    }

    public onInit(point, size) {
        this.node.setPosition(point.x, point.y);
        this.node.getComponent(UITransform).setContentSize(size.x, size.y);

        this.bindNode.RegisterClick("button", this.onClickMark, this);
        this.bindNode.getNode("sprite").active = false;
    }

    private onClickMark( event : EventTouch) : void {
        if (this.clickCallback) {
            this.clickCallback();
        }
    }

    public setMarkShow(show: boolean) {
        this.isShow = show
        this.bindNode.getNode("sprite").active = show;
    }
}