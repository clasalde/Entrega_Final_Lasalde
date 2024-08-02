const dotenv = require("dotenv");
const program = require("../utils/commander.js");

const {mode} = program.opts();

console.log("mode:", mode);

dotenv.config({
    path: mode === "production" ? "./.env.production" : "./.env.development"
});

const configObject = {mongo_url: process.env.MONGO_URL};

module.exports = configObject;