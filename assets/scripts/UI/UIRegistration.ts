import { UIConfig,  UILayer, UIMaskType } from "../../Plugins/EFramework/UI/UIConfig";
import { UIRegistry } from "../../Plugins/EFramework/UI/UIRegistry";
import { TestPane2 } from "./TestPanel2";
import { TestPane3 } from "./TestPanel3";


UIRegistry.register(TestPane2, {prefab: "db://assets/resources/TestPanel2.prafab", layer: UILayer.Common});
UIRegistry.register(TestPane3, {prefab: "db://assets/resources/TestPanel2.prafab", layer: UILayer.Common});


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
