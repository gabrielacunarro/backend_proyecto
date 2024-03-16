import { Command } from "commander";

const args = new Command()

args.option("-p <port>", "port")
//si es solo 1 letra -, si es ma de una --
args.option("--env <env>", "environment", "prod" )

args.parse()

export default args.opts()