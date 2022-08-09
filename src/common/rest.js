import axios from 'axios';

const rest = {
  fetch: (token) => {
    axios.get(
      'http://localhost:8080',
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((response) => {
        return response;
      }).catch((error) => {
        alert(error.message);
    });
  },

  save: (data, token) => {
    axios.post(
        'http://localhost:8080',
        data,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        alert(error.message);
      });
  },
}

export default rest;