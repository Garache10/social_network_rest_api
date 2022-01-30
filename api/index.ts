import { Server } from "./server";
import "../configurations/database";

const server = new Server();
server.start();