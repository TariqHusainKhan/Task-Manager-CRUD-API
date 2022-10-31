const express = require("express");
const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require("../controllers/taskController.js")

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
// We can also write as
// router.route("/").get(getAllTasks).post(createTask);

router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

// router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router;