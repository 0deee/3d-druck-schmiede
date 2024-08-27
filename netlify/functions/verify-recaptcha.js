const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { recaptchaToken } = JSON.parse(event.body);

  if (!recaptchaToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No reCAPTCHA token provided' }),
    };
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';  
  const requestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const requestBody = new URLSearchParams({
      secret: secretKey,
      response: recaptchaToken,
    });

  const response = await fetch(recaptchaURL, {
    method: 'POST',
    headers: requestHeaders,
    body: requestBody.toString(),
  });
    
  const responseData  = await response.json();

  if (responseData.success) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: responseData['error-codes'] }),
    };
  }
};
