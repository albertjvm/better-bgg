import { parse } from './parse';

const BGG_API_URL = 'https://www.boardgamegeek.com/xmlapi2/';

function getUserByName(name) {
  return makeRequest('user', {name})
    .then(result => simplifyValues(result.user));
}

function getCollectionByUsername(username) {
  return makeRequest('collection', {username})
    .then(result => result.items);
}

function makeRequest(path, params) {
  return fetch(`${BGG_API_URL}${path}?${Object.keys(params).map(
    k => `${k}=${params[k]}`).join('&'
  )}`, {
    mode: 'cors',
  })
    .then(response => response.text())
    .then(xml => parse(xml));
}

function simplifyValues(obj) {
  return Object.keys(obj)
    .filter(key => !obj[key].hasOwnProperty('value') || Boolean(obj[key].value))
    .reduce((acc, key) => ({
      ...acc,
      [key]: (obj[key].hasOwnProperty('value') && Object.keys(obj[key]).length === 1)
        ? obj[key].value
        : obj[key]
    }), {});
}

export { getUserByName, getCollectionByUsername };
