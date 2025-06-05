require('dotenv').config()
const mail = require('@sendgrid/mail');
// mail.setApiKey(process.env.SENDGRID_API_KEY);



exports.handler = async function(event, context, callback) {
  try {
    console.log('event', event);
    const name = event.queryStringParameters.name
    const email = event.queryStringParameters.email
    const mood = event.queryStringParameters.mood
    const message = event.queryStringParameters.message
    const email2 = "darkskiiittles@gmail.com"

    const payload = {
      to: `${name} <${email}>`,
      dynamicTemplateData: {
        greeting: `Hello ${name}`,
        email: `${email}`,
        mood: `${mood}`,
        message: `${message}`
      }
    }

    const payload2 = {
      to: `Tristan <${email2}>`,
      dynamicTemplateData: {
        greeting: `Hello Tristan. New Email from ${email}`,
        mood: `${mood}`,
        message: `${message}`
      }
    }

    await mail.send({
      from: 'DarkMeow Productions <noreply@darkmeowproductions.com>',
      replyTo: "noreply@darkmeowproductions.com",
      templateId: 'd-8da3e4888cde4a91844ea627de285e7b',
      personalizations: [payload, payload2]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email Sent!' }),
    };
  } catch (error) {
    console.log(error.response.body);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'ERROR SENDING EMAIL' }),
    };
  }
}

