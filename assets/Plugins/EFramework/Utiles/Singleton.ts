/**
 * 可继承的单例模式基类
 * 支持TypeScript继承，确保每个子类都有独立的单例实例
 */
abstract class Singleton implements IInitialize, IDisposable {
    public static instance<T extends new (...args: any[]) => any>(this : T) : InstanceType<T> {
        let c : any = this;
        if(!c._instance){
            c._instance = new c();
            c._instance.beginInit();
            c._instance.onInit();
            c._instance.endInit();
            console.log("Singleton instance", c._instance.constructor.name);
        }
        return c._instance;
    }

    public beginInit(): void {
    }

    public onInit(): void {
    }

    public endInit(): void {
    }

    /**
     * 销毁方法（子类可重写）
     */
    public onDestroy(): void {
        console.log("Singleton onDestroy");
    }

}
export default Singleton;
