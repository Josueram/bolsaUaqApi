const express = require("express");

const authRoute = require("./authRoute");
const empresaRoute = require("./empresaRoute");
const empresasRoute = require("./empresasRoute");
const uploadsRoute = require("./uploadsRoute");
const vacantesRoute = require("./vacantesRoute");

module.exports = {
	authRoute,
	empresaRoute,
	empresasRoute,
	uploadsRoute,
	vacantesRoute,
};
