import { Component, Node, director } from "cc";

/*
 * onLoad
 * onEnable
 * start
 * update
 * lateUpdate
 * onDisable
 * onDestroy
 */
class GameManager extends Component {
    private static _instance: GameManager;

    private _childManagers: IManager[] = [];

    public static get instance() {
        if (GameManager._instance) return;

        const gameNode = new Node("GameManager");
        GameManager._instance = gameNode.addComponent(GameManager);
        director.addPersistRootNode(gameNode);

        return GameManager._instance;
    }

    onLoad() {

    }

    onEnable() { }

    start() { }

    public addChildManager(manager: IManager) {
        this._childManagers.push(manager);
    }

    protected update(deltaTime: number) {
        this._childManagers.forEach(manager => {
            manager.onUpdate?.(deltaTime);
        });
    }

    protected lateUpdate(deltaTime: number) { 
        this._childManagers.forEach(manager => {
            manager.onLateUpdate?.(deltaTime);
        });
    }

    protected onDisable() { }

    protected onDestroy() {
        this._childManagers.forEach(manager => {
            manager.onDestroy?.();
        });
        GameManager._instance = null;
    }
}

export { GameManager }; 