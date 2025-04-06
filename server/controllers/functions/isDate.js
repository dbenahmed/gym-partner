export function isYYYYMMDD(date) {
    const isoRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const isISO8601 = isoRegex.test(date)
    if (!isISO8601) {
        return {
            success: false,
            message: "Due Date does not follow the format YYYY-MM-DD"
        }
    }
    return {
        success: true
    }
}

export function isHHMMSS(time) {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    const timeIsUndefined = time === null || time === undefined;
    const isTime = timeRegex.test(time)
    if (!isTime || timeIsUndefined) {
        return {
            success: false,
            message: "Start Time does not follow the format HH-MM-SS"
        }
    }
    return {
        success: true
    }
}