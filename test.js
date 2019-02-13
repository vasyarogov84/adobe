const fs = require("fs");
let data = require("./data/leads.json");

const test = data.leads.map((el, index) => ({ ...el, index }));

let sortData = test.sort(
  (a, b) =>
    Date.parse(b.entryDate) - Date.parse(a.entryDate) && b.index - a.index
);
//console.log("SORT", sortData);

function findIndex(value) {
  let allIndexVal = sortData.map(obj => obj.index);
  let i = allIndexVal.indexOf(value);
  console.log(i);
  return i;
}

sortData.map(sd => {
  test.map(d => {
    if (sd.email === d.email && sd.index !== d.index) {
      const index = findIndex(d.index);
      let logsData = `${d._id} was deleted for duplication policy \n`;
      fs.appendFile("./logs/message.txt", logsData , function(err) {
        if (err) throw err;
        console.log("Saved!");
      });
      sortData.splice(index, 1);
    } else if (sd._id === d._id && sd.index !== d.index) {
      const index = findIndex(d.index);
      sortData.splice(index, 1);
    }
  });
});

fs.writeFileSync(
  "./output/filter.js",
  JSON.stringify(sortData, null, 2),
  "utf-8"
);
