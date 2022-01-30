import { Request, Response } from 'express';
import Post from '../modules/post/post.model';
import { get_all, get_by_id, get_all_by_param, create, update, remove } from '../statics/repository.static';

class post_controller {
  public async get_all_posts(req: Request, res: Response): Promise<void> {
    const posts = await get_all(req, res, Post);
    res.json(posts);
  }
  
  public async get_post_by_id(req: Request, res: Response): Promise<void> {
    const post = await get_by_id(req, res, Post);
    res.json(post);
  }

  public async get_post_by_owner(req: Request, res: Response): Promise<void> {
    req.params.param = 'owner';
    const post = await get_all_by_param(req, res, Post);
    res.json(post);
  }

  public async create_post(req: Request, res: Response): Promise<void> {
    const post = await create(req, res, Post);
    res.json(post);
  }

  public async update_post(req: Request, res: Response): Promise<void> {
    req.body.updated_at = Date.now();
    const post = await update(req, res, Post);
    res.json(post);
  }

  public async delete_post(req: Request, res: Response): Promise<void> {
    const post = await remove(req, res, Post);
    res.json(post);
  }
}

export { post_controller };