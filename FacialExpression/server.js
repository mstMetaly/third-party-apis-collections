const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


async function makeRequest() {
    
const data = new FormData();
data.append('image', '1-1.jpg');
// data.append('url', 'E:/Dev/API/API_Server/FacialExpression/1-1.jpg');

const options = {
  method: 'POST',
  url: 'https://faceanalyzer-ai.p.rapidapi.com/faceanalysis',
  headers: {
    'x-rapidapi-key': 'bee1680dcemsh42d77a9645a1a09p1db91ejsn3a9336951cfe',
    'x-rapidapi-host': 'faceanalyzer-ai.p.rapidapi.com'
  },
  data: data
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

}

makeRequest();

