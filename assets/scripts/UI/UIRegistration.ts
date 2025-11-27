import { UIConfig,  UILayer, UIMaskType } from "../../EFramework/UI/UIConfig";
import { UIRegistry } from "../../EFramework/UI/UIRegistry";
import { MainPanel } from "./MainPanel";


//UIRegistry.register(MainPanel, {prefab: "db://assets/resources/MainPanel.prafab", layer: UILayer.Common});


// 便捷配置生成器
export class UIConfigBuilder {
    static create(layer: UILayer, prefab: string, options?: Partial<UIConfig>): UIConfig {
        return {
            layer,
            prefab,
            destory: options?.destory ?? true,
            safeArea: options?.safeArea ?? true,
            mask: options?.mask ?? UIMaskType.None,
            bundle: options?.bundle ?? "resources",
            ...options
        };
    }
    
    // 常用配置快捷方法
    static common(prefab: string, options?: Partial<UIConfig>): UIConfig {
        return this.create(UILayer.Common, prefab, options);
    }
    
    static popup(prefab: string, options?: Partial<UIConfig>): UIConfig {
        return this.create(UILayer.Popup, prefab, {
            mask: UIMaskType.Black,
            ...options
        });
    }
    
    static top(prefab: string, options?: Partial<UIConfig>): UIConfig {
        return this.create(UILayer.Top, prefab, options);
    }
}
