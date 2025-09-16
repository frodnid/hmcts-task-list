const { fetchTasks } = require("./model")

exports.getTasks = function(req, res, next) {
    fetchTasks()
        .then((tasks)=> {
            res.status(200).send({ tasks })
        })
}