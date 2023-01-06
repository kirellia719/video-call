const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/user", (req, res) => {
    res.render("user");
})

app.get("/:userId", (req, res) => {
    res.send(JSON.stringify({
        token: getAccessToken(req.params.userId)
    }));
})

app.use("/", (req, res) => {
    res.redirect("./user");
})

var port = 3000;
app.listen(port, () => console.log("Running on port " + port));

const getAccessToken = (userId) => {
    const apiKeySid = 'SK.0.wEihQqa2zlS9sTHCCXsAZHPnS9Udsg7J';
    const apiKeySecret = 'clE2bFRMVEtOTUZFSEpqdjhuZGhVbmpBYk9UdUtlWkY=';
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