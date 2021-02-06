const replaceUndefined = ({ referee, ...rest }) => {
  const pullReferee = { referee }
  console.log(`pullReferee`, pullReferee)
  console.log(...rest)
  Object.keys(referee).forEach((property) => {
    const propertyValue = referee[property]
    console.log(`propertyValue`, propertyValue)
    if (referee === undefined) {
      property = ''
    }
  })
  return pullReferee
}

module.exports = replaceUndefined
