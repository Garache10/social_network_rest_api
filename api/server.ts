import Express from "express";
import Morgan from "morgan";
import Cors from "cors";
import "dotenv/config";

import user_routes from "./routes/user.route";
import post_routes from "./routes/post.route";

class Server {
  public app: Express.Application;

  constructor() {
    this.app = Express();
    this.config();
    this.routes();
  }

  public config(): void {
    // Middlewares configuration
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: false }));
    this.app.use(Morgan("dev"));
    this.app.use(Cors());

    // Settings
    this.app.set("port", process.env.APP_PORT || 3000);
  }

  public routes(): void {
    this.app.use("/api/user", user_routes);
    this.app.use("/api/post", post_routes);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
      console.log("Environment", process.env.NODE_ENV);
      console.log("Welcome to social-network rest api");
    });
  }
}

export { Server };
