const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete }); //Task 모델 불러오기
    await newTask.save(); // 새로운 데이터 저장
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status:'fail', error: err });
  }
};

taskController.getTask = async (req,res) => {
    try{
        const taskList = await Task.find({}.select("-__v"))
        res.status(200).json({status: "ok", data: taskList});
    }catch(err) {
        res.status(400).json({status: "fail", error : err}); 
    }
};

taskController.update = async (req,res) => {
    try{
        const taskPut = await Task.put({})
        res.status(200).json({status: "ok", data : taskPut});
    }catch(err) {
        res.status(400).json({status: "fail", error : err});
    }
};

taskController.taskDelete = async (req,res) => {
    try{
        const taskDelete = await Task.delete({})
        res.status(200).json({status: "ok", data : taskDelete})
    }catch(err) {
        res.status(400).json({status: "fail", error : err})
    }
}

module.exports = taskController;
