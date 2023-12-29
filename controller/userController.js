const UserModel = require("../model/user.js");
const error = require('../middleware/errorHandling');
const token = require("../middleware/token.js")

const bcrypt = require("bcrypt");
//post by create
const create = async (req, res) => {
  const { error, value } = UserModel.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, email, password } = req.body;
  if (!req.body.name && !req.body.email && !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists or field miss' });
  }
  const hashedPassword = await bcrypt.hash(password, 18);

  const User = new UserModel({ name, email, password: hashedPassword });
  User.token = token;

  await User.save()
    .then((data) => {
      res.send({
        message: "User created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

//pagenation
const page = async (req, res) => {
  try {
    const limitValue = req.query.limit || 5;
    const offset = req.query.offset || 0;
    const skipValue = req.query.skip || 0;
    const posts = await UserModel.find().limit(limitValue).skip(skipValue);
    res.status(200).send(posts);
  } catch (e) {
    console.log(e);
  }
};

//getall by using get

const findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  create,
  findAll,
  page,
};
