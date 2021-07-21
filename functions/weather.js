const querystring = require('querystring');
const fetch = require("node-fetch");

const headers = {
   "Access-Control-Allow-Origin": process.env.HOST,
   "Content-Type": "application/json; charset=utf-8",
};

const WEATHERAPI_ORIGIN="https://api.openweathermap.org";
const path="data/2.5/weather";

exports.handler = async (event) => {
  const entries=new URLSearchParams(event.rawQuery).entries();
  const geo = paramsToObject(entries);
  const {
    lat,
    lng
  }=geo;
  console.log("lat:"+lat);
  console.log("lng:"+lng);
  const url = new URL(path, WEATHERAPI_ORIGIN);
  const parameters = querystring.stringify({
    lat: lat,
    lon: lng,
    appid: process.env.API_KEY,
  });
  url.search = parameters;
  console.log(url);
  console.log(parameters);
  try {
    const response = await fetch(url);
    console.log(response);
    const body = await response.json();
    console.log(body);
    if (body.error) {
      return {
        statusCode: body.error.code,
        ok: false,
        headers,
        body: body
      };
    }

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: body
    };
  } catch (error) {
    return {
      statusCode: 400,
      ok: false,
      headers,
      body: body
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