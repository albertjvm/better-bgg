import { parse } from './parse';

const BGG_API_URL = 'https://www.boardgamegeek.com/xmlapi2/';

function getUserByName(name) {
  return makeRequest('user', {name})
    .then(result => simplifyValues(result.user));
}

function getCollectionByUsername(username) {
  return makeRequest('collection', {username, own: 1})
    .then(result => result.items);
}

function getItemsByIds(ids) {
  return makeRequest('thing', {
    id: ids.join(','),
    versions: 0,
    videos: 0,
    historical: 0,
    marketplace: 0,
    comments: 0,
    ratingcomments: 0,
    stats: 1,
  })
    .then(result => result.items)
    .then(result => ({
      ...result,
      items: result.items.map(i => ({
        ...simplifyValues(i),
        statistics: {
          ...i.statistics,
          ratings: {
            ...simplifyValues(i.statistics.ratings),
          }
        }
      }))
    }));
}

function getPlays(username, id) {
  return makeRequest('plays', {username, id})
    .then(result => console.log(result));
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

export { getUserByName, getCollectionByUsername, getItemsByIds, getPlays };
