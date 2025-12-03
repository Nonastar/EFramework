import { Node, Component, _decorator, Enum, Button, Label, SpriteFrame, Sprite, Constructor } from "cc";

const { ccclass, property } = _decorator;

enum NodeType {
    Button = "cc.Button",
    Label = "cc.Label",
    Sprite = "cc.Sprite",
    UITransform = "cc.UITransform",
    Camera = "cc.Camera",
    Canvas = "cc.Canvas",
    Widget = "cc.Widget",
    Slider = "cc.Slider",
    Progress = "cc.ProgressBar",


    Node = "Node",
}


/**
 * 绑定配置类 - 用于序列化组件映射
 */
@ccclass('BindConfig')
class BindConfig {
    @property({ tooltip: "名称" })
    public name: string = "";

    @property({ visible: false })
    public object: Component = null;
    @property({ tooltip: "对象", type: [Component] })
    get Object() {
        return this.object;
    }
    set Object(value: Component) {
        if (!value) {
            this.object = value;
            return;
        }

        const node = (value as Component).node;
        if (this.nodeType == NodeType.Node) {
            this.object = value;
        }
        else {
            this.object = node.getComponent(this.nodeType.toString()) as Component;
        }

        if (this.name === "") {
            this.name = node.name;
        }
    }

    @property({ visible: false })
    public nodeType: NodeType = NodeType.Node;
    @property({ tooltip: "组件类型", type: Enum(NodeType) })
    get NodeType() {
        return this.nodeType;
    }
    set NodeType(value: NodeType) {
        this.nodeType = value;
        if (!this.object) return;

        const node = (this.object as Component).node;
        if (this.nodeType != NodeType.Node) {
            this.object = node.getComponent(this.nodeType.toString()) as Component;
        }
    };
}

/**
 * 节点绑定组件 - 可以挂载到场景上的通用组件
 */
@ccclass('NodeBind')
export class NodeBind extends Component {
    @property({ tooltip: "是否在onLoad时自动绑定" })
    public autoBind: boolean = true;

    @property({
        tooltip: "组件映射配置",
        displayName: "组件映射",
        type: [BindConfig]
    })
    public bindMap: BindConfig[] = [];

    private componentMap: Record<string, Node | Component> = {};

    onLoad() {
        if (this.autoBind) {
            this.autoBindNodes();
        }
    }

    /**
     * 自动绑定节点和组件
     */
    private autoBindNodes(): void {
        this.bindMap.forEach(element => {
            if (element.object != null) {
                const node = element.object.node;
                if (element.name == null || element.name === "") {
                    element.name = node.name;
                }

                if (element.nodeType == NodeType.Node) {
                    this.componentMap[element.name] = node;
                }
                else {
                    this.componentMap[element.name] = element.object;
                }
            }
        });
    }

    /**
     * 获取绑定的节点
     */
    public getNode(key: string): Node | null {
        const t = this.componentMap[key];
        if (t instanceof Component) return (t as Component).node;
        return this.componentMap[key] as Node || null;
    }

    /**
     * 获取绑定的组件
     */
    public getNodeComponent<T extends Component>(key: string, componentType?: Constructor<T>): T | null {
        const target = this.componentMap[key];
        if (!target) return null;

        if (target instanceof Component) {
            // 如果指定了组件类型，检查类型匹配
            if (componentType) {
                return target instanceof componentType ? target as T : null;
            }
            // 未指定组件类型，直接返回组件实例
            return target as T;
        }

        // 如果是节点，尝试获取指定组件
        if (target instanceof Node && componentType) {
            return target.getComponent(componentType) as T || null;
        }

        return null;
    }

    /**
     * 设置节点显示状态
     */
    public setNodeVisible(key: string, visible: boolean): void {
        const node = this.getNode(key);
        if (node && node.active !== visible) {
            node.active = visible;
        }
    }

    public RegisterClick<T extends Function>(node: Node | string, callback: T, target?: any): void {
        if (node instanceof Node) {
            node.on(Button.EventType.CLICK, callback, target);
        }
        else {
            this.getNode(node).on(Button.EventType.CLICK, callback, target);
        }
    }

    public UnregisterClick<T extends Function>(node: Node | string, callback: T, target?: any): void {
        if (node instanceof Node) {
            node.off(Button.EventType.CLICK, callback, target);
        }
        else {
            this.getNode(node).off(Button.EventType.CLICK, callback, target);
        }
    }

    public SetLabelText(nodeName: string, text: string): void {
        const label = this.getNodeComponent(nodeName, Label);
        if (label) {
            label.string = text;
        }
    }

    public SetSpriteFrame(nodeName: string, spriteFrame: SpriteFrame): void {
        const sprite = this.getNodeComponent(nodeName, Sprite);
        if (sprite) {
            sprite.spriteFrame = spriteFrame;
        }
    }


    /**
     * 清理所有绑定
     */
    public clearBindings(): void {
        this.bindMap = [];
        this.componentMap = {};
    }
}