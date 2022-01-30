import { Router } from "express";
import { user_controller } from "../controllers/user.controller";

class user_router {
  router: Router;
  controller: user_controller;

  constructor() {
    this.router = Router();
    this.controller = new user_controller();
    this.routes();
  }

  routes() {
    this.router.get("/", this.controller.get_all_users);
    this.router.get("/:id", this.controller.get_user_by_id);
    this.router.get("/:param/:value", this.controller.get_user_by_username);
    this.router.post("/", this.controller.create_user);
    this.router.put("/:id", this.controller.update_user);
    this.router.delete("/:id", this.controller.delete_user);
    this.router.post("/login", this.controller.login);
  }
}

const user_routes = new user_router();
export default user_routes.router;