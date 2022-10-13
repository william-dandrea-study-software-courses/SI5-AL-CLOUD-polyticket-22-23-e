

exports.dateWithIncrement = (minutesToAdd) => {
    let date = new Date();
    let expirationDate = new Date(date.getTime() + minutesToAdd * 60000);
    return expirationDate.toISOString();
}
