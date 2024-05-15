const express = require("express");
const router = express.Router();
const controller = require('../controllers/albumsController')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getByQuery(req.query));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const album = await controller.getById(id);
        res.send(album)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.create(req.body.user_id, req.body.title)
        res.send(await controller.getById(response.insertId));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.update(id, req.body.title)
        res.send(await controller.getById(id));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.deleteAlbum(id);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router

