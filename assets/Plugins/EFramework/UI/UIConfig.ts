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
    Game = "Game",
    View = "View",
    Top = "Top",
}

export enum UIType{
    None = 0,
    Full = 1,
}

export enum UIMaskType {
    None = 0,
    Black = 1,
}
