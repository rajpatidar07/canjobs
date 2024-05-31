import moment from "moment-timezone";
export default function ConvertTime({ _date, format }) {

    /*Local Time */
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const result = moment.utc(_date).tz(timezone);
    return (format === ".calendar()"
        ? result.calendar()
        : format === ".fromNow()"
            ? result.fromNow()
            : result.format(format))

}
