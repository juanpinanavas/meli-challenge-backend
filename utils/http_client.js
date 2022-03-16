const fetch = require('node-fetch');

const makeRequest = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const makeRequests = async (urls) => {
  const responses = await Promise.all(urls.map(url => fetch(url)));
  const data = await Promise.all(responses.map(response => response.json()));
  return data;
}

module.exports = {
  makeRequest,
  makeRequests
};