import { JsonAsset } from "cc";
import { ef, Singleton } from "../../Plugins/EFramework/Framework";


class LevelLogic extends Singleton {
    private levelList: {[Key: number]: any} = {};
    private isLoaded: boolean = false;
    private loadPromise: Promise<void> | null = null;

    public onInit(): void {
        this.loadPromise = this.onLoadLevelList();
    }

    private onLoadLevelList = async (): Promise<void> => {
        let jsonAsset = await ef.resourcesManager.loadAsset("db://assets/Bundles/Level.json", JsonAsset, null, { bundle: "Data" });
        let levelJson = jsonAsset.json;
        
        // 等待所有关卡数据加载完成
        const loadPromises = levelJson.map(async (item: { order: number; config: string }) => {
            const levelData = await this.loadLevelData(item.config);
            this.levelList[item.order] = levelData;
        });
        
        await Promise.all(loadPromises);
        this.isLoaded = true;
        console.log("LevelList loaded successfully");
    }

    private loadLevelData = async (levelConfig: string): Promise<any> => {
        console.log("LevelLogic loadLevelData", levelConfig);
        let jsonAsset = await ef.resourcesManager.loadAsset(`db://assets/Bundles/LevelConfig/${levelConfig}.json`, JsonAsset, null, { bundle: "Data" });
        return jsonAsset.json;
    }

    public getLevelCount = async (): Promise<number> => {
        // 确保数据加载完成后再返回
        if (this.loadPromise) {
            await this.loadPromise;
        }
        return Object.keys(this.levelList).length;
    }

    public getLevelConfig = async (index: number): Promise<any> => {
        // 确保数据加载完成后再返回
        if (this.loadPromise) {
            await this.loadPromise;
        }
        return this.levelList[index];
    }

    public finishLevel(index: number): void {
        if (this.levelList[index]) {
            this.levelList[index].isFinished = true;
        }
    }

    public isLevelFinished(index: number): boolean {
        if (this.levelList[index]) {
            return this.levelList[index].isFinished || false;
        }
        return false;
    }

    public isLevelListLoaded(): boolean {
        return this.isLoaded;
    }
}

export default LevelLogic;