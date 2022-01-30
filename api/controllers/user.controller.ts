import { get_all, create, get_by_id, get_by_param, update, remove } from "../statics/repository.static";
import { Request, Response } from "express";
import User from "../modules/user/user.model";
import Jwt from "jsonwebtoken";

class user_controller {
  public async get_all_users(req: Request, res: Response): Promise<void> {
    const users = await get_all(req, res, User);
    res.json(users);
  }

  public async get_user_by_id(req: Request, res: Response): Promise<void> {
    const user = await get_by_id(req, res, User);
    res.json(user);
  }

  public async get_user_by_username(req: Request, res: Response): Promise<void> {
    const user = await get_by_param(req, res, User);
    res.json(user);
  }

  public async create_user(req: Request, res: Response): Promise<void> {
    const new_user = new User(req.body);
    req.body.password = await new_user.encrypt_password(req.body.password);
    const user = await create(req, res, User);
    res.json(user);
  }

  public async update_user(req: Request, res: Response): Promise<void> {
    const user = new User(req.body);
    req.body.password = await user.encrypt_password(req.body.password);
    const response = await update(req, res, User);
    res.json(response);
  }

  public async delete_user(req: Request, res: Response): Promise<void> {
    const user = await remove(req, res, User);
    res.json(user);
  }

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      }
      const valid = await user?.validate_password(req.body.password);
      if(!valid) {
        res.status(401).json({
          message: "Invalid credentials",
        });
      }
      const token: string = Jwt.sign({ _id: user?._id }, process.env.SECRET_KEY_JWT || 'SECRET_KEY_JWT');
      res.json({
        message: "User logged in successfully",
        user,
        token: token
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

export { user_controller };