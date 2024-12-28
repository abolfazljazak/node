const express = require("express");
const app = express();
const config = require("./config");
const users = require("./users");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send(`hello ${req.query.username}`);
});

app.get("/user", (req, res) => {
  res.status(200).json({
    data: users,
    success: true,
  });
});

app.get("/user/:id", (req, res) => {
  let user = users.find((user) => {
    if (user.id == req.params.id) return user;
  });
  res.status(200).json({
    data: user,
    success: true,
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  user.id = parseInt(user.id);
  users.push(user);
  res.json({
    data: "کاربر با موفقیت اضافه شد.",
    success: true,
  });
});

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
