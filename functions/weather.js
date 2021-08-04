const querystring = require('querystring');
const fetch = require('node-fetch');

const headers = {
   "Access-Control-Allow-Origin": process.env.HOST,
   "Content-Type": "application/json; charset=utf-8",
};

const WEATHERAPI_ORIGIN="https://api.openweathermap.org";
const path="data/2.5/weather";

exports.handler = async (event) => {
  console.log(event);
  console.log(typeof(event.multiValueHeaders.Origin));
  console.log(typeof(process.env.HOST));
  const sourceOri=new URL(event.multiValueHeaders.Origin);
  const acceptOri=new URL(process.env.HOST);
  console.log(sourceOri);
  console.log(acceptOri);
  if(sourceOri.origin!=acceptOri.origin){
    return {
      statusCode: 400,
      ok: false,
      headers,
      body:event.Origin,
    };
  }
  const entries=new URLSearchParams(event.rawQuery).entries();
  const geo = paramsToObject(entries);
  const {
    lat,
    lng
  }=geo;
  const url = new URL(path, WEATHERAPI_ORIGIN);
  const parameters = querystring.stringify({
    lat: lat,
    lon: lng,
    appid: process.env.API_KEY,
  });
  url.search = parameters;
  try {
    const response = await fetch(url);
    const body = await response.json();
    console.log(body);
    if (body.error) {
      return {
        statusCode: body.error.code,
        ok: false,
        headers,
        body: JSON.stringify(body)
      };
    }

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: JSON.stringify(body)
    };
  } catch (error) {
    return {
      statusCode: 400,
      ok: false,
      headers,
      body: JSON.stringify(body)
    };
  }
};

function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  };