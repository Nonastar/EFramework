import { Component, Node, director } from "cc";

class AudioManager extends Component {
    private static _instance: AudioManager;

    public static get instance() {
        if (AudioManager._instance) return;

        const gameNode = new Node("GameManager");
        AudioManager._instance = gameNode.addComponent(AudioManager);
        director.addPersistRootNode(gameNode);
        return AudioManager._instance
    }

    onLoad() {

    }

    onEnable() { }

    start() { }

    update(deltaTime: number) {}

    lateUpdate(deltaTime: number) { }

    onDisable() { }

    onDestroy() {
        AudioManager._instance = null;
    }
}

export { AudioManager };