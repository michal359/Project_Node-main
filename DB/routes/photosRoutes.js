const express = require("express");
const router = express.Router();
const controller = require('../controllers/photosController')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    res.send(await controller.getAll());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const photo = await controller.getById(id);
    res.send(photo)
});

router.post("/", async(req, res) => {
    const response=await controller.create(req.body.album_id, req.body.title, req.body.url, req.body.thumbnailUrl)
    res.send(await controller.getById(response.insertId));
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.update(id ,req.body.title, req.body.url, req.body.thumbnailUrl)
    res.send(await controller.getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.deletePhoto(id);
    res.send();
});

module.exports = router

