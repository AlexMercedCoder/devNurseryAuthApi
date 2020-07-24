require("dotenv").config();
const Notes = require("../../schemas/notes");

const index = async (req, res) => {
  try {
    const { username } = req.payload;
    const allNotes = await Notes.find({ username });
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  try {
    const { username } = req.payload;
    const note = await Notes.findById(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req, res) => {
  try {
    const { username } = req.payload;
    const { title, body } = req.body;
    const note = await Notes.create({ username, title, body });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  try {
    const { username } = req.payload;
    const { title, body } = req.body;
    const note = await Notes.findByIdAndUpdate(req.params.id, {
      username,
      title,
      body,
    });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req, res) => {
  try {
    const { username } = req.payload;
    const note = await Notes.findOneAndRemove({ _id: req.params.id, username });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  index,
  show,
  update,
  create,
  destroy,
};
