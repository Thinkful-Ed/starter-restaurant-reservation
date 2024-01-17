export default function addDashes(f) {
  //remove existing dashes
  f.value = f.value.split("-").join("");

  //remove any non-numeric or dash chars
  f.value = f.value.replace(/[^0-9-]/g, "");

  //add dashes in a specific format
  f.value = f.value.replace(
    /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/,
    "$1$2$3-$4$5$6-$7$8$9$10"
  );
}
