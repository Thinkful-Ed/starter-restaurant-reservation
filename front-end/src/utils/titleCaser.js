const titleCaser = (string) =>
  string
    .split(" ")
    .map(
      (splitString) =>
        splitString[0].toUpperCase() + splitString.slice(1).toLowerCase()
    )
    .join(" ");

export default titleCaser;
