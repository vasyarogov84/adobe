const fs = require("fs");
let data = require("./data/leads.json");

const test = data.leads.map((el, index) => ({ ...el, index }));

let sortData = test
  .sort((a, b) => Date.parse(b.entryDate) - Date.parse(a.entryDate));
  
function findIndex(value) {
    let allIndexVal = sortData.filter(obj => obj.index).indexOf(value);
    return allIndexVal;
}
  

sortData.map(sd => {
  test.map( d => {
    if (sd.email === d.email && sd.index !== d.index) {
      const index = findIndex(d.index);  
      sortData.splice(index, 1);
    } else if (sd._id === d._id && sd.index !== d.index) {
        const index = findIndex(d.index);  
        sortData.splice(index, 1);
    }
    return d;
  });
  return sd;
});

console.log(sortData);
//fs.writeFileSync("./outputs/filter.js", JSON.stringify(data, null, 2) , 'utf-8');
