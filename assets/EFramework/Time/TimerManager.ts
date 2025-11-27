import { Component, Node, director } from "cc";

class TimerManager extends Component {
    private static _instance: TimerManager;

    public static get instance() {
        if (TimerManager._instance) return;

        const gameNode = new Node("GameManager");
        TimerManager._instance = gameNode.addComponent(TimerManager);
        director.addPersistRootNode(gameNode);

        return TimerManager._instance;
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
        TimerManager._instance = null;
    }

}

export { TimerManager }; 