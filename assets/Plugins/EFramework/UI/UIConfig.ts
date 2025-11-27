export interface UIConfig {
    /** ui show layer*/
    layer: UILayer;
    /** ui prefab path*/
    prefab: string;
    /** destory ui when close. default is true*/
    destory?: boolean;
    /** show mask. default is UIMaskType.None*/
    mask?: UIMaskType;
    /** auto add safe area. default is true*/
    safeArea?: boolean;
    /** bundle name. default is resources*/
    bundle?: string;
}

export enum UILayer {
    None = 0,
    Common = 1,
    Popup = 2,
    Top = 3,
}

export enum UIType{
    None = 0,
    Full = 1,
}

export enum UIMaskType {
    None = 0,
    Black = 1,
}
