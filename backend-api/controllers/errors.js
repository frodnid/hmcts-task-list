exports.handlePathNotFound = function(req, res, next) {
    res.status(404).send({ msg: "Path not found." })
}

exports.handleMethodNotAllowed = function(req, res, next) {
    res.status(405).send({ msg : "Method not allowed." });
}

exports.handleBadRequest = function (err, req, res, next) {
    const badRequestErrorCodes = ["42703", "23514", "22P02", "23502"]
    if (badRequestErrorCodes.includes(err.code)) {
        res.status(400).send({ msg: "Bad request." });
    }
    else {
        next(err);
    }
}

exports.handleCustomBadRequest = function (err, req, res, next) {
    if(err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}