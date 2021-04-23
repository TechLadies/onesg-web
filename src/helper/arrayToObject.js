// This function removes the id from an object
// It goes through object properties.
// Inputs: arrays that require removal of id from output.
// Output: arrays with all other properties except id
const arrayToObject = ({ ...rest }) => {
  const restDuplicate = { ...rest }
  Object.keys(rest).forEach((property) => {
    const propertyValue = rest[property]
    if (propertyValue === null) {
      // do nothing
    } else if (Array.isArray(propertyValue)) {
      restDuplicate[property] = rest[property].map(arrayToObject)
    } else if (typeof propertyValue === 'object') {
      restDuplicate[property] = arrayToObject(propertyValue)
    }
  })
  return restDuplicate
}

module.exports = arrayToObject
