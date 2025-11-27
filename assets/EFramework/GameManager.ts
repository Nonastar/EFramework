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

    public addChildManager(manager: Component) {
        this.node.addChild(manager.node);
    }

    update(deltaTime: number) {}

    lateUpdate(deltaTime: number) { }

    onDisable() { }

    onDestroy() {
        GameManager._instance = null;
    }

}

export { GameManager }; 