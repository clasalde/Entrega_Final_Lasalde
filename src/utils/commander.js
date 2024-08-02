const {Command} = require("commander");
const program = new Command();

program.option("--mode <mode>", "development", "production")
program.parse();

module.exports = program;