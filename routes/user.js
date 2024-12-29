const express = require("express");
const router = express.Router();
const users = require("./../users");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  res.status(200).json({
    data: users,
    success: true,
  });
});

router.get("/:id", (req, res) => {
  let user = users.find((user) => {
    if (user.id == req.params.id) return user;
  });
  res.status(200).json({
    data: user,
    success: true,
  });
});

router.post(
  "/",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const user = req.body;
    user.id = parseInt(user.id);
    users.push(user);
    res.json({
      data: "کاربر با موفقیت اضافه شد.",
      success: true,
    });
  }
);

router.put("/:id", (req, res) => {
  users = users.map((user) => {
    if (user.id == req.params.id) {
      return req.body;
    } else {
      return user;
    }
  });
  res.json({
    data: "کاربر با موفقیت بروز شد.",
    success: true,
  });
});

router.delete("/:id", (req, res) => {
  user = users.find((user) => {
    if (user.id !== req.params.id) {
    }
  });
  res.json({
    data: "کاربر با موفقیت حذف شد.",
    success: true,
  });
});


module.exports = router