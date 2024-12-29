const express = require("express");
const app = express();
const config = require("./config");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send(`hello ${req.query.username}`);
});

app.use('/user', require("./routes/user"))

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
