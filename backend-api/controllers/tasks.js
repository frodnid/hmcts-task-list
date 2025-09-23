const { fetchTasks, insertTask, fetchTask, updateTask, removeTask } = require("../model")

exports.getTasks = function(req, res, next) {
    fetchTasks()
        .then((tasks)=> {
            res.status(200).send({ tasks })
        })
        .catch((err) => {
            next(err);
        })
}

exports.postTask = function(req, res, next) {
    const payload = req.body;
    insertTask(payload)
        .then((task)=> {
            res.status(201).send({ task });
        })
}


exports.getTask = function(req, res, next) {
    const taskID = req.params.id
    fetchTask(taskID)
        .then((task) => {
            res.status(200).send({ task });
        })
}

exports.patchTask = function(req, res, next) {
    const taskID = req.params.id;
    const taskData = req.body
    updateTask(taskID, taskData)
        .then((task)=> {
            res.status(200).send( { task });
        })
        .catch((err) => {
            next(err);
        })
}

exports.deleteTask = function(req, res, next) {
    const taskID = req.params.id;
    removeTask(taskID)
        .then(()=> {
            res.status(204).send();        
        })
        .catch((err)=> {
            console.log(err)
            next(err);
        })
}