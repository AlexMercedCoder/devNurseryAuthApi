//////////////////
//DEPENDENCIES
//////////////////
require("dotenv").config();
const User = require("../../schemas/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//GLOBALS
const SECRET = process.env.SECRET;

///////////////////
// USER ROUTE HANDLERS
//////////////////

const create = async (req, res) => {
  try {
    const { username } = req.body;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.token = jwt.sign({ username }, SECRET, {
      expiresIn: 60 * 60 * 24 * 14,
    });

    const newUser = await User.create(req.body);

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const update = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error });
  }
};

const destroy = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });

    const match = await bcrypt.compare(password, foundUser.password);


    if (match) {
      try {
        const { token, _id } = foundUser;

        const payload = jwt.verify(token, SECRET);

        res.status(200).json({ username, token, _id });

      } catch (err) {
        foundUser.token = jwt.sign({ username }, SECRET, {
          expiresIn: 60 * 60 * 24 * 14,
        });
        await findByIdAndUpdate(foundUser._id, foundUser, { new: true });
        res.status(200).json({ username, token, _id });
      }
    } else {
      throw "Wrong Password";
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ error });
  }
};

////////////////
// Export
///////////////

module.exports = { create, update, destroy, login };
