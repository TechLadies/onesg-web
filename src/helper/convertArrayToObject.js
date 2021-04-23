// Convert array to object - start //
const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    }
  }, initialValue)
}

module.exports = convertArrayToObject
// Convert array to object - end //
