const fs = require("fs");
let data = require("./data/leads.json");
const loggerCreation = require("./helpers/loggerCreation");

let test = data.leads.map((el, index) => ({ ...el, index }));

let sortData = data.leads
  .map((el, index) => ({ ...el, index }))
  .sort((a, b) => {
    return (
      Date.parse(b.entryDate) === Date.parse(a.entryDate) ? 
        b.index - a.index : Date.parse(b.entryDate) - Date.parse(a.entryDate)
    );
  });
  console.log(test);
function findIndex(value) {
  let allIndexVal = sortData.map(obj => obj.index);
  let i = allIndexVal.indexOf(value);
  return i;
}

sortData
  .map(sortedData => {
    test.map(indexedData => {
      let { _id, email, index } = indexedData;

      if (sortedData.email === email && sortedData.index !== index) {
        const userIndexToDelete = findIndex(index);
        const reason = "EMAIL DUPLICATION";
        const loggerData = loggerCreation(sortedData, indexedData, reason);
        fs.appendFile("./logs/duplicate_users.txt", loggerData, err => {
          if (err) throw err;
        });
        sortData.splice(userIndexToDelete, 1);
      } else if (sortedData._id === _id && sortedData.index !== index) {
        const userIndexToDelete = findIndex(index);
        const reason = "ID DUPLICATION";
        const loggerData = loggerCreation(sortedData, indexedData, reason);
        fs.appendFile("./logs/duplicate_users.txt", loggerData, err => {
          if (err) throw err;
        });
        sortData.splice(userIndexToDelete, 1);
      }
    });
    return sortedData;
  })
  .map(valid_customer => {
    delete valid_customer.index;
    return valid_customer;
  });

const validUsers = {};
validUsers.leads = sortData;

fs.writeFileSync(
  "./output/valid_leads.json",
  JSON.stringify(validUsers),
  "utf-8"
);
