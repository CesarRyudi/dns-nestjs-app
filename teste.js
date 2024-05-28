import axios from 'axios';

const headers = {
  Authorization: 'Bearer ' + 'TOKEN AQUI',
  'Content-Type': 'application/json',
};

const body = {
  data: 'PNS',
  table: 'TABLE',
  take: 'PAGE SIZE',
  skip: 'PAGE',
};

async function notQuery() {
  const url = 'URL DINAMICA AQUI';
  const response = await axios.get(url, { headers: headers });
  return response.data.results;
}

async function query() {
  const url = 'https://dns.harutech.com.br/quotes/consulta_massa';
  const response = await axios.post(url, body, { headers: headers });
  return response.data.results;
}


if(QUERY) return query();
else return notQuery();