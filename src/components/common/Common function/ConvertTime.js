import moment from "moment-timezone";
export default function ConvertTime({ _date, format }) {

    /*Local Time */
    // let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const result = moment.utc(_date).local();
    console.log(result.format("LT"),result.format("DD-MM-YYYY"))
    return ((_date && _date !== "0000-00-00 00:00:00" && _date !== "0000-00-00")
        ? format === ".calendar()"
            ? result.calendar()
            : format === ".fromNow()"
                ? result.fromNow()
                : result.format(format)
        : "N/A")

}
