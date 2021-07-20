const GOOGLEAPIS_ORIGIN = "";

const headers = {
   "Access-Control-Allow-Origin": process.env.HOST,
   "Content-Type": "application/json; charset=utf-8",
};

const WEATHERAPI_ORIGIN="https://api.openweathermap.org";
const path="data/2.5/weather";

exports.handler = async (event) => {
  const {
    lat,
    lng
  } = event;

  const url = new URL(path, WEATHERAPI_ORIGIN);\
  const parameters = querystring.stringify({
    lat: lat,
    lon: lng,
    appid: process.env.API_KEY,
  });
  url.search = parameters;

  try {
    const response = await fetch(url);
    const body = await response.json();

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