import { UIPanelBase } from "../../Plugins/EFramework/UI/UIPanelBase";
import { RegisterUI } from "../../Plugins/EFramework/UI/UIRegistry";
import { UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";

import { instantiate, Node, SpriteFrame, UITransform } from "cc";
import { ef } from "../../Plugins/EFramework/Framework";
import { MarkItem } from "./MarkItem";
import LevelLogic from "../Logic/LevelLogic";
import { SuccessPanel } from "./SuccessPanel";

// 使用装饰器注册主界面
@RegisterUI({
    layer: UILayer.View,
    prefab: "db://assets/Bundles/LevelPanel.prafab",
    bundle: "UI",
})
export class LevelPanel extends UIPanelBase {
    private levelIndex: number;
    private levelData: any;
    private points: { number: number, isMark: boolean, markItem: MarkItem[] }[] = [];


    onLoad() {
        super.onLoad();
        console.log("LevelPanel loaded");
        this.nodeBind.RegisterClick("back", this.onClose, this);
        this.nodeBind.RegisterClick("tipsButton", this.onClickTips, this);
    }

    private onClickTips(): void {
        console.log("Click Tips");
    }

    async onShow(index: number) {
        super.onShow(index);
        this.levelIndex = index;
        console.log("LevelPanel show", index);
        await this.loadLevelData(index);
        this.loadLevelBackground();
        this.loadLevelImage();
        this.loadDiffrientPoint();
        this.setLevelUI();
    }

    public onReset(): void {
        this.points.forEach(p => {
            p.isMark = false; 
            p.markItem.forEach(m => {
                m.setMarkShow(false);
            })
        })
    }

    private async loadLevelData(index: number): Promise<void> {
        this.levelData = await LevelLogic.instance().getLevelConfig(index);
    }

    private async loadLevelBackground(): Promise<void> {
        let levelConfig = this.levelData;
        console.log("LevelPanel loadLevelBackground", levelConfig);
        if (levelConfig.background == null || levelConfig.background == "") {
            return;
        }
        let asset = await ef.resourcesManager.loadAsset(`db://assets/Bundles/${levelConfig.background}`, SpriteFrame, null, { bundle: "spriteFrame" });
        if (asset == null) {
            return;
        }
        this.nodeBind.SetSpriteFrame("background", asset);
    }

    private async loadLevelImage(): Promise<void> {
        let levelConfig = this.levelData;
        console.log("LevelPanel loadLevelAssets", levelConfig);
        // 修正路径和参数名
        let asset = await ef.resourcesManager.loadAsset(`db://assets/Bundles/${levelConfig.img}`, SpriteFrame, null, { bundle: "spriteFrame" });
        if (asset == null) {
            return;
        }
        this.nodeBind.SetSpriteFrame("typeImg", asset);
        const transform = this.nodeBind.getNode("typeImg").getComponent(UITransform)
        transform.setContentSize(levelConfig.size.x, levelConfig.size.y);
    }

    private setLevelUI(): void {
        let levelConfig = this.levelData;
        console.log("LevelPanel setLevelUI", levelConfig);
        this.nodeBind.SetLabelText("levelName", levelConfig.name);
    }

    private loadDiffrientPoint(): void {
        let levelConfig = this.levelData;
        console.log("LevelPanel setDiffrientPoint", levelConfig.points);

        const mark = this.nodeBind.getNode("mark");
        const parent = this.nodeBind.getNode("typeImg");

        levelConfig.points.forEach((point: any, index: number) => {
            this.addMarkItem(mark, parent, point, index);
        });
        mark.active = false;
    }

    private addMarkItem(mark: Node, parent: Node, data: any, index: number) {
        const point1 = data.point1;
        const point2 = data.point2;
        const size = data.size;

        const mark1 = instantiate(mark);
        const mark1c = new MarkItem(mark1);

        console.log("Add Mark", mark1c);
        console.log("addChild Mark", mark1c);
        parent.addChild(mark1);
        mark1c.onInit(point1, size);
        mark1c.clickCallback = () => this.onClickMark(index);

        const mark2 = instantiate(mark);
        const mark2c = new MarkItem(mark2);
        parent.addChild(mark2);
        mark2c.onInit(point2, size);
        mark2c.clickCallback = () => this.onClickMark(index);

        this.points.push({ number: index, isMark: false, markItem: [mark1c, mark2c] });
    }

    private onClickMark(index: number): void {
        console.log("Click Mark", index);
        const point = this.points.find(p => p.number == index);
        if (point) {
            point.isMark = true;
            for (let mark of point.markItem) {
                mark.setMarkShow(true);
            }
        }
        this.checkFinish();
    }

    private checkFinish(): void {
        let finish = true;
        for (let point of this.points) {
            if(!point.isMark){
                finish = false;
                break;
            }
        }
        if (finish) {
            LevelLogic.instance().finishLevel(this.levelIndex);
            ef.uiManager.openPanel(SuccessPanel);
        }
    }

}