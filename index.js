const apiKeySid = 'SK.0.wEihQqa2zlS9sTHCCXsAZHPnS9Udsg7J';
const apiKeySecret = 'clE2bFRMVEtOTUZFSEpqdjhuZGhVbmpBYk9UdUtlWkY=';
const userId = 'user1';

var token = getAccessToken();
console.log(token);


function getAccessToken() {
    var now = Math.floor(new Date().getTime() / 1000);
    var exp = now + 3600;

    var header = { cty: "stringee-api;v=1" };
    var payload = {
        jti: apiKeySid + "-" + now,
        iss: apiKeySid,
        exp: exp,
        userId: userId
    };

    var jwt = require('jsonwebtoken');
    var token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header })
    return token;
}