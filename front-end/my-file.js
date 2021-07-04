const closedTime = new Date("2021-07-05 10:30");
const inputTime = new Date("2021-07-05 10:00");
console.log(" closedTime: ",closedTime);
console.log("inputTime: ",inputTime);
if ( closedTime > inputTime ){
    console.log("Sorry We Are Closed!!!");
}else{
    console.log("Welcome!!!");
}

// const now = new Date();
// const date = new Date("2021-07-03 04:50:40");
// console.log(" now: ",now);
// console.log("date: ",date);
// if ( now > date ){
//     console.log("now is grreater");
// }else{
//     console.log("date is greater");
// }