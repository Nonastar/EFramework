import { Singleton } from "../Utiles/Singleton";

class TimerManager extends Singleton implements IManager {

    onUpdate(deltaTime: number): void {
    }
    onLateUpdate(deltaTime: number): void {
    }
    onDestroy(): void {
    }
}

export { TimerManager }; 