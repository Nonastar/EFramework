import { Singleton } from "../Utiles/Singleton";

class SceneManager extends Singleton<SceneManager> {
}

export const sceneManager = SceneManager.instance();