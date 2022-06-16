const authorization = require("./authorization");
const isAdmin = require("./isAdmin");
const isUser = require("./isUser");
const notFound = require("./notFound");

module.exports = {
	authorization,
	isAdmin,
	isUser,
	notFound
};