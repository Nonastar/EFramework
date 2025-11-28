/**
 * 可继承的单例模式基类
 * 支持TypeScript继承，确保每个子类都有独立的单例实例
 */
export abstract class Singleton implements IInitialize, IDisposable {
    public static instance<T extends new (...args: any[]) => any>(this : T) : InstanceType<T> {
        let c : any = this;
        if(!c._instance)c._instance = new c();
        return c._instance;
    }

    public beginInit(): void {
    }

    public endInit(): void {
    }

    /**
     * 销毁方法（子类可重写）
     */
    public onDestroy(): void {

    }

}
export default Singleton;
