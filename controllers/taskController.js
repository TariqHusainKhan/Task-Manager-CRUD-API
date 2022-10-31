const { findOneAndDelete } = require("../models/taskModel.js");
const taskModel = require("../models/taskModel.js");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../errors/custom-error.js")

const getAllTasks = asyncWrapper(async (req,res) => {
      const tasks = await taskModel.find({});
      //res.status(200).json({ tasks });

     // res.status(200).json({ tasks,amount:task.length });
      res.status(200).json({ status:"Success" , data:{tasks,amount:tasks.length }});
})

const createTask = asyncWrapper(async (req,res) => {
    const task = await taskModel.create(req.body)
    res.status(201).json({ task }); 
})

const getTask = asyncWrapper(async (req,res,next) => {
        const {id:taskID} = req.params;
      //  const task = await taskModel.findOne({_id:taskID});
        const task = await taskModel.findById({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with id :${taskID}`,404));
        }
        res.status(200).json({ task });
    })

const updateTask = asyncWrapper(async (req,res) => {
       const {id:taskID} = req.params;
       const task = await taskModel.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true});
       if(!task){
          return next(createCustomError(`No task with id :${taskID}`,404));
      }
      res.status(200).json({task}); 
})

const deleteTask = asyncWrapper(async (req,res) => {
      const {id:taskID} = req.params;
      const task = await taskModel.findOneAndDelete({_id:taskID});
      if(!task){
        return next(createCustomError(`No task with id :${taskID}`,404));
      }
     res.status(200).json({task});
     //res.status(200).send();
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}