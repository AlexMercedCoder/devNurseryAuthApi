const { Router } = require("express");
const router = new Router();
const { create, update, destroy, login } = require("../../handlers/user");

router.post("/create", create);

router.put("/update/:id", update);

router.delete("/delete/:id", destroy);

router.post("/login", login);

module.exports = router;
