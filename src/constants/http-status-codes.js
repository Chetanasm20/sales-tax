/** * contains all the http status codes that have to be sent to the client */
const statusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NO_CONTENT: 204
};
module.exports = {statusCodes};
