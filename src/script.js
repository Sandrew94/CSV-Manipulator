//Elements
const csvInput = document.querySelector(".loadCsv");

//Check special char
const errorSpecialChar = function (arr, arrOfSpecialChar) {
  arrOfSpecialChar.map((specialChar) => {
    if (arr.includes(specialChar))
      throw new Error("Delete the special character in csv files then retry");
  });
  console.log("Succed! No special char");
};

///////////////////
//////////////////
//////////////////
//Read input file and load csvData function from that files
function readUploadFile(event) {
  const targetEvent = event.target.files[0];
  //console.log(targetEvent);

  const read = new FileReader();
  read.onload = function (e) {
    //console.log(e);
    const contents = e.target.result;
    csvData(contents, 16, 33, ["#", "@", "&", "$", "~", "ò"]);
    //Chose max numbers for rows
    //Chose max numbers for columns
    //Chose the special char do you want to check
  };
  read.readAsText(targetEvent);
}

////////////////////
////////////////////
////////////////////
//Manipulate csv

const csvData = function (content, maxColomunNum, maxRowNum, arrOfSpecialChar) {
  const allData = content.split("\n");

  const column = allData.map((arr) => {
    errorSpecialChar(arr, arrOfSpecialChar); // return error if there are a special char
    const splitted = arr.split(","); //colums
    splitted.pop();
    return splitted;
  });

  //error if it reach max numbers of columns allowed
  if (column[0].length > maxColomunNum) {
    throw new Error(
      `You exceed the max numbers of Column (${column[0].length}), upload csv file with less then ${maxColomunNum} colomuns`
    );
  }
  ////////////

  const rows = column.splice(1);
  rows.splice(rows.length - 2, rows.length); //delete 2 strange rows

  rows.forEach((col) => {
    //error if it reach max numbers of row allowed
    if (col.length > maxRowNum) {
      throw new Error(
        `You exceed the max numbers of Rows (${col.length}), upload csv file with less then ${maxRowNum} rows`
      );
    }

    //If the input in the col n.2 is different from numbers, return error!
    if (Number.isNaN(+col[2]))
      throw new Error(`The columns number 2 allowed only numbers`);
  });
};

/////////////

csvInput.addEventListener("change", readUploadFile);
