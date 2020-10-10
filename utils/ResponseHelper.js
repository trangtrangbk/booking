const httpStatus = require('http-status');

const ResponeMessage = {
    Ok: (res, message = "Ok") => {
        return res.status(httpStatus.OK).json({message});
    },
    Created: (res, message = "Created") => {
        return res.status(httpStatus.CREATED).json({message});
    },

    BadRequest: (res, message = "bad request") => {
        return res.status(httpStatus.BAD_REQUEST).json({message});
    },
    Unauthorized: (res, message = "Unauthorized") => {
        return res.status(httpStatus.UNAUTHORIZED).json({message});
    },
    Forbidden: (res, message = "Forbidden") => {
        return res.status(httpStatus.FORBIDDEN).json({message});
    },
    NotFound: (res, message = "not found") => {
        return  res.status(httpStatus.NOT_FOUND).json({message});
    },
    MethodNotAllowed: (res, message = "Method Not Allowed") => {
        return  res.status(httpStatus.METHOD_NOT_ALLOWED).json({message});
    },

    InternalServerError: (res, message = "Internal Server Error") => {
        return  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message});
    },
}

module.exports = ResponeMessage;