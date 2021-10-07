function formatReadableDate(date){
    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-us", {
        timeZone: "UTC",
        weekday: "short", 
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export default formatReadableDate;