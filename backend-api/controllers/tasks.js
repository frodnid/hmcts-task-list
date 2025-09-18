const { fetchTasks, fetchTask } = require("../model")

exports.getTasks = function(req, res, next) {
    fetchTasks()
        .then((tasks)=> {
            res.status(200).send({ tasks })
        })
        .catch((err) => {
            next(err);
        })
}


exports.getTask = function(req, res, next) {
    const taskID = req.params.id
    fetchTask(taskID)
        .then((task) => {
            res.status(200).send({ task });
        })
}