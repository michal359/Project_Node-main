const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
const cors = require('cors'); 
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    res.send(await controller.getByQuery(req.query));
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await controller.getById(id);
    res.send(comment)
});

router.post("/", async(req, res) => {
    const response=await controller.create(req.body.post_id, req.body.name, req.body.email, req.body.body)
    res.send(await controller.getById(response.insertId));
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.update(id ,req.body.body,req.body.name)
    res.send(await controller.getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.deleteComment(id);
    res.send();
});

module.exports = router

