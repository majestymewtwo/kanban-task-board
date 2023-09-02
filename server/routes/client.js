const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const middleware = require('../middlewares/middleware');

router.get('/', middleware, (req,res) => {
    res.send("Hello from secured endpoint");
});

router.post(`/client/register`, async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "Created Account Successfully"});
  } catch (err) {
    if(err.code === 11000){
      res.status(400).json({ error: "Email already exists" });
    }else{
      res.status(500).json({ error: "An error has occured" });
    }
  }
});

router.post("/client/login", async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(401).json({ error : "Invalid Credentials"});
    } else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
          },
          process.env.SECRET
        );
        res.json({token: token });
      } else {
        res.status(401).json({ error : "Invalid Credentials"});
      }
    }
})

module.exports = router;