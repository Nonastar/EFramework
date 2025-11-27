
/**
 * 状态任务（类型安全）
 * @remarks
 * 封装 promise，防止重复调用 resolve 函数报错以及添加超时功能，可重复使用
 */
class ETask<T = void> {
	/**
	 * @param finish 完成状态
	 * @param config 初始化配置
	 */
	constructor(finish: boolean, config?: InitConfig<T>) {
		this._isFinish = finish;
		this._initConfig = config;

		if (this._isFinish) {
			this.task = new Promise<void>((resolveFunc) => {
				resolveFunc();
			}) as any;
		} else {
			this._reset();
		}
	}

	/* --------------- public --------------- */
	/** 异步任务 */
	public task!: Promise<T>;

	/**
	 * 完成状态
	 * - true：任务结束
	 * - false：任务进行中
	 */
	public get isFinish(): boolean {
		return this._isFinish;
	}

	/** 完成状态 */
	private _isFinish = false;
	/** 完成回调 */
	private _finishFunc: ((data: T) => void) | null = null;
	/** 初始化配置 */
	private _initConfig?: InitConfig<T>;
	/** 超时倒计时 */
	private _timeoutTimer: any;
	
	/**
	 * 完成任务
	 * @param isFinish 完成状态
	 */
	finish<K extends false>(isFinish: K): void;
	/**
	 * 完成任务
	 * @param isFinish 完成状态
	 * @param data_ 完成数据
	 */
	finish<K extends true>(isFinish: K, data_: T): void;
	finish<K extends true | false>(isFinish: K, data_?: T): void {
		if (this._isFinish === isFinish) {
			return;
		}

		if (isFinish) {
			this._finishFunc?.(data_!);
		} else {
			this._reset();
		}
	}

	/** 重置 */
	private _reset(): void {
		this._isFinish = false;
		this.task = new Promise<T>((resolveFunc) => {
			this._finishFunc = (data) => {
				resolveFunc(data);
				this._isFinish = true;
				this._finishFunc = null;

				// 清理定时器
				if (this._timeoutTimer) {
					clearTimeout(this._timeoutTimer);
					this._timeoutTimer = null;
				}
			};
		});

		// 超时定时器
		if (this._initConfig?.timeoutMsNum !== undefined && this._initConfig.timeoutMsNum > 0) {
			this._timeoutTimer = setTimeout(() => {
				this._timeoutTimer = null;
				this.finish(true, this._initConfig!.timeoutReturn!);
			}, this._initConfig.timeoutMsNum);
		}
	}
}

export interface InitConfig<T> {
		/** 超时时间 */
		timeoutMsNum?: number;
		/** 超时返回数据 */
		timeoutReturn?: T;
	}

export default ETask;
