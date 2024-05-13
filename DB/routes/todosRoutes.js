const express = require("express");
const router = express.Router();
const controller = require('../controllers/todosController')
const cors = require('cors'); // Import cors
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors()); // Add CORS middleware here

router.get("/", async (req, res) => {
    console.log("req:",(req.query))
    res.send(await controller.getByQuery(req.query));
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const todo = await controller.getById(id);
    res.send(todo)
});

router.post("/", async(req, res) => {
    const response=await controller.create(req.body.user_id, req.body.title, req.body.completed)
    res.send(await controller.getById(response.insertId));
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.update(id ,req.body.title, req.body.completed)
    res.send(await controller.getById(id));
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.deleteTodo(id);
    res.send();
});

module.exports = router;

