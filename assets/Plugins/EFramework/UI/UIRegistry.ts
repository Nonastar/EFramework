import { UIPanelBase } from "./UIPanelBase";
import { UIConfig, UILayer, UIMaskType } from "./UIConfig";

// 界面注册装饰器
export function RegisterUI(config: UIConfig) {
    return function <T extends new (...args: any[]) => UIPanelBase>(constructor: T) {
        UIRegistry.register(constructor, config);
        return constructor;
    };
}

// 集中式界面注册管理器
export class UIRegistry {
    private static _configs: Map<string, UIConfig> = new Map();
    private static _classes: Map<string, any> = new Map();
    
    /**
     * 注册界面类
     * @param panelClass 界面类
     * @param config 界面配置
     */
    static register(panelClass: any, config: UIConfig): void {
        const panelName = panelClass.name;
        this._configs.set(panelName, config);
        this._classes.set(panelName, panelClass);
        
        console.log(`register ui : ${panelName}`, config);
    }

        /**
     * 批量注册界面
     * @param registrations 注册信息数组
     */
    static batchRegister(registrations: Array<{panelClass: any, config: UIConfig}>): void {
        registrations.forEach(registration => {
            this.register(registration.panelClass, registration.config);
        });
    }
    
    /**
     * 获取界面配置
     * @param panelName 界面名称
     */
    static getConfig(panelName: string): UIConfig | undefined {
        return this._configs.get(panelName);
    }
    
    /**
     * 获取界面类
     * @param panelName 界面名称
     */
    static getClass(panelName: string): any | undefined {
        return this._classes.get(panelName);
    }
    
    /**
     * 检查界面是否已注册
     * @param panelName 界面名称
     */
    static isRegistered(panelName: string): boolean {
        return this._configs.has(panelName);
    }
    
    /**
     * 获取所有已注册的界面配置
     */
    static getAllConfigs(): { [key: string]: UIConfig } {
        const result: { [key: string]: UIConfig } = {};
        this._configs.forEach((config, key) => {
            result[key] = config;
        });
        return result;
    }
    
    /**
     * 获取所有已注册的界面类
     */
    static getAllClasses(): { [key: string]: any } {
        const result: { [key: string]: any } = {};
        this._classes.forEach((panelClass, key) => {
            result[key] = panelClass;
        });
        return result;
    }
    

    
    /**
     * 清理所有注册信息
     */
    static clear(): void {
        this._configs.clear();
        this._classes.clear();
        console.log("界面注册信息已清理");
    }
}
