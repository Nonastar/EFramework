import Singleton from "../Utiles/Singleton";
import ELogger from "../Utiles/ELogger";
import { UIPanelBase } from "./UIPanelBase";
import { Constructor, Prefab, Node, Scene, Canvas,instantiate, director } from "cc";
import { UIRegistry } from "./UIRegistry";
import { ef } from "../Framework";
import { NodeBind } from "../Utiles/NodeBind";

class UIManager extends Singleton implements IManager {
    private log = new ELogger("UIManager");
    private canvas: NodeBind | null = null;

    private openPanelList: UIPanelBase[] = [];

    public async onInit() {
        const node = director.getScene().getChildByName("Canvas");
        director.addPersistRootNode(node);

        this.canvas = node.getComponent(NodeBind)
    }

    public async openPanel<T extends Constructor<UIPanelBase>>(ui: T, args?: any) {
        this.log.log("open", ui.name);
        const panel = new ui();
        const config = UIRegistry.getConfig(ui.name);
        if (!config) {
            this.log.error(`not register ui: ${ui.name}`);
            return;
        }
        const prefabPath = config.prefab;
        if (!prefabPath) {
            this.log.error(`not find ui prefab: ${ui.name}`);
            return;
        }
        
        
        const source = await ef.resourcesManager.loadAsset(prefabPath, Prefab, null, {bundle: config.bundle});
        const node = instantiate(source) as Node;
        panel.bindNode(node);
        
        this.setPanelParent(panel, config.layer);

        this.openPanelList.push(panel);
        panel.onLoad();
        panel.onShow(args);
    }

    private setPanelParent(panel: UIPanelBase, layer: string) {
        const parent = this.canvas.getNode(layer);
        if (parent) {
            parent.addChild(panel.node);
        }
        else {
            this.log.error("not find canvas");
        }
    }

    public async closePanel<T extends Constructor<UIPanelBase>, T2 extends UIPanelBase>(ui: T | T2) {
        const panel = this.openPanelList.find(v => v === ui);
        if (!panel) {
            this.log.warn("not open ui: ", ui.constructor.name);
            return;
        }
        panel.close();
        this.openPanelList = this.openPanelList.filter(v => v.constructor !== ui);
        panel.node.destroy();
        this.log.log("close", ui.constructor.name);
    }

    public findPanel<T extends UIPanelBase>(ui: Constructor<T> ) {
        return this.openPanelList.find(v => v.constructor === ui) as T ;
    }

    public onUpdate(deltaTime: number): void {
        this.openPanelList.forEach(panel => {
            if (panel.node.active ) {
                panel.onUpdate?.(deltaTime);
            }
        });
    }

    public onLateUpdate(deltaTime: number): void {
        this.openPanelList.forEach(panel => {
            if (panel.node.active ) {
                panel.onLateUpdate?.(deltaTime);
            }
        });
    }

    public onDestroy(): void {
    }
}

export {UIManager}
