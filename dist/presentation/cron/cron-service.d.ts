import { CronJob } from "cron";
type CronTime = string | Date;
type OnTick = () => void;
export declare class CronService {
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob;
}
export {};
//# sourceMappingURL=cron-service.d.ts.map