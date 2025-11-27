import { Component, Node, director } from "cc";

class ResourcesManager extends Component {
    private static _instance: ResourcesManager;

    public static get instance() {
        if (ResourcesManager._instance) return;

        const gameNode = new Node("GameManager");
        ResourcesManager._instance = gameNode.addComponent(ResourcesManager);
        director.addPersistRootNode(gameNode);

        return ResourcesManager._instance;
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
        ResourcesManager._instance = null;
    }

}

export { ResourcesManager }; 