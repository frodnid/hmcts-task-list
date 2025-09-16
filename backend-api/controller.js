const { fetchTasks } = require("./model")

exports.getTasks = function(req, res, next) {
    fetchTasks()
        .then((tasks)=> {
            console.log(tasks);
            res.status(200).send({ tasks })
        })
}