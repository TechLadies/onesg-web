const axios = require('axios')

async function fetchRefereeData() {
  return axios
    .get(
      'https://701425e7-05f7-4da8-9fb7-5a4bdc002cfc.mock.pstmn.io/v1/referees'
    )
    .then((res) => res.data)
}

export default {
  fetchRefereeData,
}
