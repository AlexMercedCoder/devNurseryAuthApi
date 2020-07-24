const { Router } = require("express");
const router = new Router();
const auth = require("../../middleware/auth");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../../handlers/notes");

router.get("/", auth, index);

router.get("/:id", auth, show);

router.post("/", auth, create);

router.put("/:id", auth, update);

router.delete("/:id", auth, destroy);

module.exports = router;
