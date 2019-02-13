const loggerCreation = (sortedData, indexedData, reason) => {
    const {_id, email, firstName, lastName, address, entryDate} = indexedData;
   return `
    SOURCE:  { \n
        "_id": ${_id}, \n
        "email": ${email}, \n
        "firstName":  ${firstName}, \n
        "lastName": ${lastName}, \n
        "address": ${address}, \n
        "entryDate": ${entryDate} \n
        } \n
    OUTPUT: { \n
        "_id": ${sortedData._id}, \n
        "email": ${sortedData.email}, \n
        "firstName":  ${sortedData.firstName}, \n
        "lastName": ${sortedData.lastName}, \n
        "address": ${sortedData.address}, \n
        "entryDate": ${sortedData.entryDate} \n
        } \n
    REASON:  ${reason} \n 
    ${reason === "EMAIL DUPLICATION" ? "EMAIL" : "ID"}:  ${reason === "EMAIL DUPLICATION" ? email : _id}  \n
    ---------------------------------------------------------------------------------------
   `;
}

module.exports = loggerCreation;