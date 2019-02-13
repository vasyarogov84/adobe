const fs = require("fs");
let data = require("./data/leads.json");
const loggerCreation = require("./helpers/loggerCreation");

fs.truncate("./logs/duplicate_users.txt", 0, () => {
  console.log("duplicate_users.txt empty");
});

let dataWithIndex = data.leads.map((el, index) => ({ ...el, index }));

let sortData = data.leads
  .map((el, index) => ({ ...el, index }))
  .sort((a, b) => {
    return Date.parse(b.entryDate) === Date.parse(a.entryDate)
      ? b.index - a.index
      : Date.parse(b.entryDate) - Date.parse(a.entryDate);
  });

function findIndex(value) {
  let allIndexVal = sortData.map(obj => obj.index);
  let i = allIndexVal.indexOf(value);
  return i;
}

sortData
  .map(user => {
    dataWithIndex.map(indexed_user => {
      let { _id, email, index } = indexed_user;

      if (user.email === email && user.index !== index) {
        const userIndexToDelete = findIndex(index);
        const reason = "EMAIL DUPLICATION";
        const loggerData = loggerCreation(user, indexed_user, reason);
        fs.appendFile("./logs/duplicate_users.txt", loggerData, err => {
          if (err) throw err;
        });
        sortData.splice(userIndexToDelete, 1);
      } else if (user._id === _id && user.index !== index) {
        const userIndexToDelete = findIndex(index);
        const reason = "ID DUPLICATION";
        const loggerData = loggerCreation(user, indexed_user, reason);
        fs.appendFile("./logs/duplicate_users.txt", loggerData, err => {
          if (err) throw err;
        });
        sortData.splice(userIndexToDelete, 1);
      }
    });
    return user;
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
