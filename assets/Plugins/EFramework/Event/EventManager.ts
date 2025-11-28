import { Singleton } from "../Utiles/Singleton";
import { EventTarget } from "cc";


class EventManager extends Singleton {
    private _event: EventTarget = new EventTarget();

    on<T extends IEvent, T2 extends (event_: IEvent) => void>(
        type_: T,
        callback_: T2,
        this_?: any,
        isOnce_?: boolean
    ): typeof callback_ | null {
        return this._event.on(type_ as any, callback_ as any, this_, isOnce_);
    }

    onTest<T extends IEvent>(
        type_: T,
        callback_: any,
        this_?: any,
        isOnce_?: boolean
    ): typeof callback_ | null {
        return this._event.on(type_ as any, callback_ as any, this_, isOnce_);
    }

    once<T extends keyof IEvent, T2 extends (event_: IEvent) => void>(
        type_: T,
        callback_: T2,
        this_?: any): typeof callback_ | null {
        return this._event.once(type_ as any, callback_ as any, this_);
    }

    // @ts-ignore
    off<T extends keyof IEvent, T2 extends (event_: IEvent) => void>(type_: T, callback_?: T2, this_?: any): void {
        this._event.off(type_ as any, callback_ as any, this_);
    }

    // @ts-ignore
    emit<T extends keyof IEvent, T2 extends IEvent>(type_: T, ...args_: T2): void {
        this._event.emit(type_ as any, args_);
    }

    // @ts-ignore
    has<T extends keyof IEvent, T2 extends (event_: IEvent) => void>(type_: T, callback_?: T2, target_?: any): boolean {
        return this._event.hasEventListener(type_ as any, callback_ as any, target_);
    }

    declare clear: () => void;

    /** 请求（等待返回） */
    // @ts-ignore
    request<T extends keyof IEvent, T2 extends Parameters<CT[T]>, T3 extends ReturnType<CT[T]>>(type_: T | T[], ...args_: T2): Promise<T3>[] {
        if (Array.isArray(type_)) {
            const resultTaskList: Promise<any>[] = [];

            type_.forEach((v) => {
                resultTaskList.push(...this._requestSingle(v, ...args_));
            });

            return resultTaskList;
        } else {
            return this._requestSingle(type_, ...args_);
        }
    }

    /** 请求单个事件 */
    // @ts-ignore
    private _requestSingle<T extends keyof IEvent, T2 extends Parameters<CT[T]>, T3 extends ReturnType<CT[T]>>(type_: T, ...args_: T2): Promise<T3>[] {
        /** 返回值 */
        const resultTaskList: Promise<any>[] = [];
        /** 回调列表 */
        const callbackFuncList: { callback: Function; target?: any }[] = this["_callbackTable"][type_]?.callbackInfos;

        if (!callbackFuncList) {
            return resultTaskList;
        }

        callbackFuncList.forEach((v) => {
            const oldCallbackFunc = v.callback;
            const target = v.target;

            v.callback = (...argsList: any[]) => {
                resultTaskList.push(oldCallbackFunc.call(target, ...argsList));
                v.callback = oldCallbackFunc;
            };
        });

        this.emit(type_, ...args_);

        return resultTaskList;
    }
}

export const eventManager = EventManager.instance();