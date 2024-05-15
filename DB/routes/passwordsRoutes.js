const express = require("express");
const router = express.Router();
const controller = require('../controllers/passwordsController')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAll());
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const password = await controller.getById(id);
        res.send(password)
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router

