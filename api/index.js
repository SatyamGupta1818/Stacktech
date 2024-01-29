const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send({ message: "Started" });
});

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("Error Connecting to Database", error);
  });

app.listen(port, () => {
  console.log("Server is Running on Port 8000");
});

//Endpoints for Registering the user

const User = require("./models/user");
const Post = require("./models/post");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    //check if the email is already registered

    const existingUser = await User.findOne({ email });
    const encryptPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      console.log("Email already reigstered");
      return res.status(400).json({ message: "Email already registered" });
    }

    //Create a new User
    const newUser = new User({
      name,
      email,
      password,
      profileImage,
    });

    //generate the verigication token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database

    await newUser.save();

    //send the verification email to the registerd user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({
      message:
        "Registration Successfull, Please check the email for Verification",
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sg5722233@gmail.com",
      pass: "ycvi bmpg gger gvbm",
    },
  });

  const mailOptions = {
    from: "stacktech@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `please click the following link to verify your email : http://localhost:8080/verify/${verificationToken}`,
  };

  //send the email

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

//endpoint to verify email

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification Token" });
    }

    //mark the user Verified

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification failed" });
  }
});

//Endpoint to login user

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exist already
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invaild email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

//endpoints to fetch users profile

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retreving user profile" });
  }
});


