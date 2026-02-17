import { LogRepository } from "../../repository/log.repository";
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;
export declare class CheckService implements CheckServiceUseCase {
    private readonly logRepository;
    private readonly successCallback;
    private readonly errorCallback;
    constructor(logRepository: LogRepository, successCallback: SuccessCallback, errorCallback: ErrorCallback);
    execute(url: string): Promise<boolean>;
}
export {};
//# sourceMappingURL=check-service.d.ts.map