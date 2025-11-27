import EEvent from "../Plugins/EFramework/Event/EEvent";

/**
 * 游戏事件类型定义
 */
interface GameEventType {
    // 游戏生命周期事件
    GAME_START: () => void;
    GAME_PAUSE: () => void;
    GAME_RESUME: () => void;
    GAME_OVER: (score: number) => void;
    
    // 玩家事件
    PLAYER_MOVE: (x: number, y: number) => void;
    PLAYER_JUMP: () => void;
    PLAYER_ATTACK: (target: string) => void;
    PLAYER_DIE: () => void;
    
    // UI事件
    UI_SHOW: (panelName: string) => void;
    UI_HIDE: (panelName: string) => void;
    UI_UPDATE: (data: any) => void;
    
    // 数据事件
    DATA_LOAD: (data: any) => void;
    DATA_SAVE: (key: string, value: any) => void;
    
    // 网络事件
    NET_CONNECT: () => void;
    NET_DISCONNECT: () => void;
    NET_MESSAGE: (message: any) => void;
}



// 导出单例实例
export const gameEvent = new EEvent<GameEventType>();
export default gameEvent;