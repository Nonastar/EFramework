import { Singleton } from "../Utiles/Singleton";
import ELogger from "../Utiles/ELogger";
import { UIPanelBase } from "./UIPanelBase";
import { Constructor, Prefab, Node, instantiate, find, director } from "cc";
import { UIRegistry } from "./UIRegistry";
import mkAsset from "../Resources/MKAsset";

class UIManager extends Singleton {
    private log = new ELogger("UIManager");

    private openPanelList: UIPanelBase[] = [];


    constructor() {
        super();
    }

    public async open<T extends Constructor<UIPanelBase>>(ui: T, ...args: any[]) {
        this.log.log("open", ui);
        const panel = new ui(...args);
        const config = UIRegistry.getConfig(ui.name);
        if (!config) {
            this.log.error(`未注册界面: ${ui.name}`);
            return;
        }
        const prefabPath = config.prefab;
        let source: Prefab | Node | null = null;
        if (prefabPath) {
            source = await mkAsset.get(prefabPath, Prefab, null);
            const node = instantiate(source) as Node;
            panel.bindNode(node);
            const canvas = find("Canvas");
            if (canvas) {
                canvas.addChild(node);
            }
        }


        this.openPanelList.push(panel);
        panel.onLoad();
        panel.onShow();
    }

    public async close<T extends Constructor<UIPanelBase>, T2 extends UIPanelBase>(ui: T | T2) {
        const panel = this.openPanelList.find(v => v === ui);
        if (!panel) {
            this.log.warn("未打开该界面", ui.constructor.name);
            return;
        }
        panel.close();
        this.openPanelList = this.openPanelList.filter(v => v.constructor !== ui);
        panel.node.destroy();
        this.log.log("close", ui.constructor.name);
    }
}

export const uiManager = new UIManager();
