const express = require("express");
const router = express.Router();
const controller = require('../controllers/passwordsController')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    res.send(await controller.getAll());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const password = await controller.getById(id);
    res.send(password)
});

// router.delete("/:id", async(req, res) => {
//     const id = req.params.id;
//     const response=await controller.deletePassword(id);
//     res.send();
// });

module.exports = router

