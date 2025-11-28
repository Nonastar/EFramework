import { EDITOR, DEBUG } from "cc/env";
import Singleton from "./Singleton";
//import MKHttp from "./Network/MKHttp";
import { sys, debug, log, warn, error } from "cc";


namespace Log {
	export enum Level {
		/** 禁止所有日志输出 */
		None,
		/** 调试 */
		Debug = 1,
		/** 打印 */
		Log = 2,
		/** 警告 */
		Warn = 4,
		/** 错误 */
		Error = 8,
		/** debug 及以上 */
		DebugUp = Debug | Log | Warn | Error,
		/** log 及以上 */
		LogUp = Log | Warn | Error,
		/** warn 及以上 */
		WarnUp = Warn | Error,
	}

	/** 打印对象类型 */
	export enum LogObjectType {
		/** 框架，等级限制，打印模块限制 */
		MK,
		/** 控制台，可以跳转打印位置 */
		Console,
		/** cocos，等级限制 */
		CC,
	}

	/** 计时日志 */
	export interface TimeLog {
		/** 开始时间 */
		startTimeMsNum: number;
		/** 上次毫秒 */
		lastTimeMsNum: number;
	}

	export const config = new (class {
		/** 日志缓存行数 */
		cacheRowNum = 100;
		/** 报错日志上传地址 */
		errorUploadAddrStr = "";
		/** 日志等级 */
		levelNum = DEBUG ? Level.LogUp : Level.Error;
		/** 打印对象类型 */
		logObjectType = LogObjectType.Console;
		/** 错误处理函数 */
		errorHandlingFunc?: (...argsList: any[]) => any;
	})();
}

/**
 * 日志打印器
 * @noInheritDoc
 * @remarks
 * 单例对象打印名为 default
 *
 * - 支持多实例
 *
 * - 打印等级控制
 *
 * - 打印屏蔽控制
 *
 * - 报错日志 http 上传
 */
class ELogger extends Singleton {
	constructor(nameStr_: string) {
		super();

		// 初始化数据
		this._nameStr = nameStr_;
		ELogger._logMap.set(nameStr_, this);

		if (EDITOR && !window["cc"].GAME_VIEW) {
			return;
		}

		// 替换日志函数
		if (ELogger._config.logObjectType === Log.LogObjectType.Console) {
			this.debug =
				ELogger._config.levelNum & Log.Level.Debug
					? this._logFuncTab[ELogger._config.logObjectType].Debug
					: (...argsList_: any[]) => null;

			this.log =
				ELogger._config.levelNum & Log.Level.Log
					? this._logFuncTab[ELogger._config.logObjectType].Log
					: (...argsList_: any[]) => null;

			this.warn =
				ELogger._config.levelNum & Log.Level.Warn
					? this._logFuncTab[ELogger._config.logObjectType].Warn
					: (...argsList_: any[]) => null;

			this.error =
				ELogger._config.levelNum & Log.Level.Error
					? this._logFuncTab[ELogger._config.logObjectType].Error
					: (...argsList_: any[]) => null;
		}

		// 错误监听
		if (!ELogger._isInit) {
			ELogger._isInit = true;

			const uploadFunc = (...argsList: any[]): void => {
				// 添加日志缓存
				ELogger._addLogCache(Log.Level.Error, eLog._getLogHead(Log.Level.Error, true), argsList);

				// 上传错误日志
				if (ELogger._config.errorUploadAddrStr) {
					/* MKHttp.post(MKLogger._config.errorUploadAddrStr, {
						body: JSON.stringify(MKLogger._cacheStrList),
					}); */

					// 清空日志缓存
					ELogger._cacheStrList.splice(0, ELogger._cacheStrList.length);
				}

				// 错误处理
				ELogger._config.errorHandlingFunc?.(...argsList);
			};

			if (sys.isBrowser) {
				let oldHandler: any;

				if (window.onerror) {
					oldHandler = window.onerror;
				}

				window.onerror = function (...argsList: any[]) {
					uploadFunc(...argsList);
					if (oldHandler) {
						oldHandler(...argsList);
					}
				};
			} else if (sys.isNative) {
				let oldHandler: any;

				if (window["jsb"]) {
					jsb["onError"]((...argsList: any[]) => {
						uploadFunc(...argsList);
					});
				} else {
					if (window["__errorHandler"]) {
						oldHandler = window["__errorHandler"];
					}

					window["__errorHandler"] = function (...argsList: any[]) {
						uploadFunc(...argsList);
						if (oldHandler) {
							oldHandler(...argsList);
						}
					};
				}
			}
		}
	}

	/* --------------- static --------------- */
	/** 全局配置 */
	private static _config = Log.config;
	/** 初始化状态 */
	private static _isInit = false;
	/** 所有 log 对象 */
	private static _logMap = new Map<string, ELogger>();
	/** 日志缓存 */
	private static _cacheStrList: string[] = [];
	/** 唯一日志模块 */
	private static _logOnlyModuleStrList: string[] = [];
	/** 限制日志模块 */
	private static _limitLogModuleStrList: string[] = [];
	/* --------------- private --------------- */
	/** 日志模块名 */
	private _nameStr!: string;
	/** 日志函数表 */
	private _logFuncTab = {
		[Log.LogObjectType.MK]: {
			target: console,
			Debug: console.debug,
			Log: console.log,
			Warn: console.warn,
			Error: console.error,
		},
		[Log.LogObjectType.Console]: {
			target: console,
			Debug: console.debug,
			Log: console.log,
			Warn: console.warn,
			Error: console.error,
		},
		[Log.LogObjectType.CC]: {
			target: cc,
			Debug: debug,
			Log: log,
			Warn: warn,
			Error: error,
		},
	};

	/** 计时信息 */
	private _timeMap = new Map<string, Log.TimeLog>();
	/* ------------------------------- static ------------------------------- */
	/**
	 * 只限模块打印
	 * @param moduleStrList_ 模块名列表
	 * @remarks
	 * 调用时会覆盖 {@link ELogger.limit} 的规则
	 */
	static only(moduleStrList_: string[]): void {
		ELogger._logOnlyModuleStrList = moduleStrList_;
		ELogger._limitLogModuleStrList = [];
	}

	/**
	 * 限制模块打印
	 * @param moduleStrList_ 模块名列表
	 * @remarks
	 * 调用时会覆盖 {@link ELogger.only} 的规则
	 */
	static limit(moduleStrList_: string[]): void {
		ELogger._logOnlyModuleStrList = [];
		ELogger._limitLogModuleStrList = moduleStrList_;
	}

	/**
	 * 添加日志缓存
	 * @param level_ 等级
	 * @param headStr_ 日志头
	 * @param argsList_ 参数
	 * @returns
	 */
	private static _addLogCache(level_: Log.Level, headStr_: string, ...argsList_: any[]): void {
		if (!argsList_?.length || ELogger._config.cacheRowNum <= 0) {
			return;
		}

		/** 缓存内容 */
		let contentStr = headStr_;

		// 填充参数内容
		{
			if (level_ === Log.Level.Error) {
				argsList_.forEach((v) => {
					let jsonStr = "";

					try {
						jsonStr = JSON.stringify(v);
					} catch (e) {
						jsonStr = "";
					}

					if (jsonStr) {
						contentStr += ", " + jsonStr;
					}
				});
			}
			// 非错误日志跳过对象和函数类型的打印
			else {
				argsList_.forEach((v) => {
					if (!["object", "function"].includes(typeof v)) {
						contentStr += ", " + v;
					}
				});
			}
		}

		// 更新缓存数据
		ELogger._cacheStrList.push(contentStr);

		// 超出缓存删除顶部日志
		if (ELogger._cacheStrList.length > ELogger._config.cacheRowNum) {
			ELogger._cacheStrList.splice(0, 1);
		}
	}

	/* ------------------------------- 功能 ------------------------------- */
	debug(...argsList_: any[]): void {
		this._log(Log.Level.Debug, ...argsList_);
	}

	log(...argsList_: any[]): void {
		this._log(Log.Level.Log, ...argsList_);
	}

	warn(...argsList_: any[]): void {
		this._log(Log.Level.Warn, ...argsList_);
	}

	error(...argsList_: any[]): void {
		this._log(Log.Level.Error, ...argsList_);
	}

	/** 计时开始 */
	timeStart(nameStr_: string, ...argsList_: any[]): void {
		if (!nameStr_) {
			this.error("参数错误");

			return;
		}

		const timeLog: Log.TimeLog = Object.create(null);

		timeLog.startTimeMsNum = timeLog.lastTimeMsNum = Date.now();
		this._timeMap.set(nameStr_, timeLog);
		if (argsList_?.length) {
			this._log(Log.Level.Log, nameStr_, ...argsList_);
		}
	}

	/** 打印耗时 */
	timeLog(nameStr_: string, ...argsList_: any[]): void {
		const timeLog = this._timeMap.get(nameStr_);

		if (!timeLog) {
			this.error("参数错误");

			return;
		}

		const currTimeMsNum = Date.now();

		if (argsList_?.length) {
			this._log(Log.Level.Log, nameStr_, ...argsList_, `耗时：${(currTimeMsNum - timeLog.lastTimeMsNum) / 1000}s`);
		}

		timeLog.lastTimeMsNum = currTimeMsNum;
	}

	/** 总耗时 */
	timeEnd(nameStr_: string, ...argsList_: any[]): void {
		const timeLog = this._timeMap.get(nameStr_);

		if (!timeLog) {
			this.error("参数错误");

			return;
		}

		this._log(Log.Level.Log, nameStr_, ...argsList_, `总耗时：${(Date.now() - timeLog.startTimeMsNum) / 1000}s`);
		this._timeMap.delete(nameStr_);
	}

	/** 日志头 */
	private _getLogHead(level_: Log.Level, isAddTime_ = true): string {
		const date = new Date();

		if (isAddTime_) {
			/** 当前日期时间 */
			const timeStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;

			return `${this._nameStr} <${Log.Level[level_]}> [${timeStr}]：`;
		} else {
			return `${this._nameStr} <${Log.Level[level_]}>：`;
		}
	}

	private _log(level_: Log.Level, ...argsList_: any[]): void {
		// 打印等级限制
		if (!(ELogger._config.levelNum & level_)) {
			return;
		}

		// 打印模块限制
		if (ELogger._logOnlyModuleStrList.length) {
			if (!ELogger._logOnlyModuleStrList.includes(this._nameStr)) {
				return;
			}
		} else {
			if (ELogger._limitLogModuleStrList.includes(this._nameStr)) {
				return;
			}
		}

		/** 日志头 */
		const headStr = this._getLogHead(level_);
		const logger = this._logFuncTab[ELogger._config.logObjectType];

		// 更新缓存
		ELogger._addLogCache(level_, headStr, ...argsList_);
		// 打印日志
		logger[Log.Level[level_]].call(logger.target, headStr, ...argsList_);
	}
}

export const eLog = ELogger.instance();

export default ELogger;
