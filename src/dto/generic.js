//Constructor Function - Can't use ES6 here.
exports.Response = function (status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
}