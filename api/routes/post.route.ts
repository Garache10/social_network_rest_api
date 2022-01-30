import { Router } from "express";
import { post_controller } from "../controllers/post.controller";

class user_router {
  router: Router;
  controller: post_controller;

  constructor() {
    this.router = Router();
    this.controller = new post_controller();
    this.routes();
  }

  routes() {
    this.router.get("/", this.controller.get_all_posts);
    this.router.get("/:id", this.controller.get_post_by_id);
    this.router.get("/owner/:value", this.controller.get_post_by_owner);
    this.router.post("/", this.controller.create_post);
    this.router.put("/:id", this.controller.update_post);
    this.router.delete("/:id", this.controller.delete_post);
  }
}

const post_routes = new user_router();
export default post_routes.router;