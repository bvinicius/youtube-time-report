export interface TimeReportInfo {
    timeSpent: number;
}

export interface PeriodicalTimeReport {
    daily: TimeReportInfo;
    weekly: TimeReportInfo;
    monthly: TimeReportInfo;
}
