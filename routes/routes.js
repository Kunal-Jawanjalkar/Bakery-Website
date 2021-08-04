const express = require("express");
const router = require("express").Router();
const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {orderValidation, registerValidation} = require('../validation')

router.get("/", (req, res) => {
  res.render("index");
});

router.get('/login', (req, res) => {
  res.render('login');
})

router.get("/signup", (req, res) => {
  res.render("signup");
});


router.post("/signup", async (req, res) => {
  // Grabbing the validation error
  const { error } = registerValidation(req.body);

  // If error show them alert
  if (error) {
    if (error.details[0].message === `"repeat_password" must be [ref:password]`)
      return res.render("signup", { alert: `passwords dont match` });
    else {
      return res.render("signup", { alert: error.details[0].message });
    }
  }

  // Checking if email already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.render("signup", { alert: "Email already exists" });

  // Hashing the password of the user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
 
  // If everything is okay save the user to the database
  try {
    const savedUser = await user.save();
    res.render("login", {alert:'Registered Successfully login to continue'})
    console.log(savedUser)
  } catch (err) {
    if (err) throw error;
  }

});

router.post("/login", async (req, res) => {
  const reqData = req.body;

  const user = await User.findOne({email:reqData.email});
  if(!user) return res.json( {msg:"Invalid email or password"});

  const validPass = await bcrypt.compare(reqData.password, user.password)
  if(!validPass) return res.json({"msg":"Invaid email or password"});

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.json({
    "msg":"logged in successfully",
    "auth-token":token
  })
 });


 // Order online endpoint
 router.get('/orderonline', (req, res)=>{
   res.render('Order')
 })

//  middleware for varifying token
const verifyToken = require('./verifytoken')

router.post('/orderonline',verifyToken, async (req, res) => {

   let requestBody = req.body; 
   console.log(requestBody)
   const { error } = orderValidation({name:requestBody.name, phone:requestBody.phone, address:requestBody.address});

   if(error) return res.json({"msg":error.details[0].message})
   
   // Importing the order model 
   const Order = require('../models/Order')
 
   console.log("This is order req body",requestBody)

   const order = new Order(requestBody)
   try{
     const savedOrder = await order.save()
     console.log(savedOrder);
     res.json({"msg":"Order placed Successfully"})
   }catch(err){
     res.json({"error":err})
   }

 })

module.exports = router;
