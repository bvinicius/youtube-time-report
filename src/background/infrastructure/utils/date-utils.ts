export function isoDate(date: Date) {
    return date.toISOString().split('T')[0];
}

export function subtractDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}
