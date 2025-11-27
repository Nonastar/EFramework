import Singleton from "../Utiles/Singleton";
import ELogger from "../Utiles/ELogger";
import { UIPanelBase } from "./UIPanelBase";
import { Constructor, Prefab, Node, instantiate, find } from "cc";
import { UIRegistry } from "./UIRegistry";
import mkAsset from "../Resources/MKAsset";

class UIManager extends Singleton implements IManager {
    private log = new ELogger("UIManager");

    private openPanelList: UIPanelBase[] = [];

    public async open<T extends Constructor<UIPanelBase>>(ui: T, ...args: any[]) {
        this.log.log("open", ui);
        const panel = new ui(...args);
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
        
        const source = await mkAsset.get(prefabPath, Prefab, null);
        const node = instantiate(source) as Node;
        panel.bindNode(node);
        const canvas = find("Canvas");
        if (canvas) {
            canvas.addChild(node);
        }


        this.openPanelList.push(panel);
        panel.onLoad();
        panel.onShow();
    }

    public async close<T extends Constructor<UIPanelBase>, T2 extends UIPanelBase>(ui: T | T2) {
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

    public findPanel<T extends Constructor<UIPanelBase>, T2 extends UIPanelBase>(ui: T | T2) {
        return this.openPanelList.find(v => v === ui);
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

export const uiManager = new UIManager();
