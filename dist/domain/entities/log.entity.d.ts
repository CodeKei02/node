export declare enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}
export declare class LogEntity {
    level: LogSeverityLevel;
    message: string;
    createdAt: Date;
    constructor(message: string, level: LogSeverityLevel);
    static fromJson: (json: string) => LogEntity;
}
//# sourceMappingURL=log.entity.d.ts.map