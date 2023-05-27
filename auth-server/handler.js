const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');
/**
 * SCOPES allows you to set access levels; this is set to read only for now because you don't have access rights to
 * update the calendar yourself. For more info, check out the SCOPES documentation at this link: https://developers.google.com/identity/protocols/oauth2/scopes
 */
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/**
 * Credentials are values required to get access to your calendar. If you see “process.env” this means
 * the value is in the “config.json” file. This is a best practice as it keeps your API secrets hidden. Please remember to add “config.json” to your “.gitignore” file.
 */
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://jarengisner.github.io/meet-app/'],
  javascript_origins: [
    'https://jarengisner.github.io',
    'http://localhost:3000',
  ],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/**
 *
 * The first step in the OAuth process is to generate a URL so users can log in with
 * Google and be authorized to see your calendar events data. After logging in, they’ll receive a code
 * as a URL parameter.
 *
 */
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the
   * "OAuth consent screen" settings in your project on your Google Console. Also, any passed
   *  scopes are the ones users will see when the consent screen is displayed to them.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // The values used to instantiate the OAuthClient are at the top of the file
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “err” and “token.”
     */

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      // Handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  //creates a new 0auth instance which includes our env variables that we created for google, and our redirect to our actual page//
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  //pulls the access_token that was sent from our path into a variable//
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );
  //sets that same variable as the credentials of our 0auth//
  oAuth2Client.setCredentials({ access_token });
  //returns a new promise from the getCalendarEvents function//
  return (
    new Promise((resolve, reject) => {
      //calendar.events.list also returns a promise//
      //pulls the specific calendar to load from our environment variables//
      calendar.events.list(
        {
          calendarId: calendar_id,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    })
      //when the promise from listing our events is resolved our .then is executed//
      .then((results) => {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({ events: results.data.items }),
        };
      })
      //if we were to reject, we would get the following error handler//
      .catch((err) => {
        // Handle error
        console.error(err);
        return {
          statusCode: 500,
          body: JSON.stringify(err),
        };
      })
  );
};
