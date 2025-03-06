declare function defaultUseWorkerNumber(prev: number): number;
type WorkerNumberGetter = (prev: number, totalWorkers: number) => number;
export declare class WorkerMultiDispatch<POST = unknown, RETURN = unknown> {
    private symbol;
    private workers;
    private terminated;
    private prevWorkerNumber;
    private getUseWorkerNumber;
    private finalizationRegistry;
    constructor(workerConstructor: () => Worker, concurrency: number, getUseWorkerNumber?: typeof defaultUseWorkerNumber);
    postMessage(message: POST, options?: Transferable[] | StructuredSerializeOptions, useWorkerNumber?: WorkerNumberGetter): number;
    addListener(callback: (this: Worker, ev: MessageEvent<RETURN>) => any, options?: boolean | AddEventListenerOptions): void;
    removeListener(callback: (this: Worker, ev: MessageEvent<RETURN>) => any, options?: boolean | AddEventListenerOptions): void;
    terminate(): void;
    isTerminated(): boolean;
    getWorkers(): Worker[];
    getSymbol(): symbol;
}
export {};
//# sourceMappingURL=worker-multi-dispatch.d.ts.map