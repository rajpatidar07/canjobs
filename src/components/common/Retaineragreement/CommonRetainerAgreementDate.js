import moment from "moment-timezone";
export default function CommonRetainerAgreementDate({ _date, format }) {
   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const result = moment.tz(_date, timezone);

    // console.log("Canadian  Date for retainer agreement", result,result.format(format))
    return ((_date && _date !== "0000-00-00 00:00:00" && _date !== "0000-00-00")
        ? format === ".calendar()"
            ? result.calendar()
            : format === ".fromNow()"
                ? result.fromNow()
                : result.format(format)
        : "N/A")

}
