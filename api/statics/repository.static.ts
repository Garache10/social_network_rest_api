import { Request, Response } from "express";

const get_all = async ( req: Request, res: Response, model: any): Promise<void> => {
  try {
    const docs = await model.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
const get_by_id = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const doc = await model.findById(req.params.id);
    if (!doc) {
      res.status(404).json({
        message: "Register not found",
      });
    } else
      res.json(doc);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
const get_by_param = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const doc = await model.findOne({ [req.params.param]: req.params.value });
    if (!doc) {
      res.status(404).json({
        message: "Register not found",
      });
    } else
      res.json(doc);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
const get_all_by_param = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const docs = await model.find({ [req.params.param]: req.params.value });
    res.json(docs);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
const create = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const doc = new model(req.body);
    await doc.save();
    res.json({
      message: "Register created successfully",
      doc
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
const update = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) {
      res.status(404).json({
        message: "Register not found",
      });
    } else
      res.json(doc);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
const remove = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    await model.findByIdAndDelete(req.params.id);
    res.json({
      message: "Register deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

export { get_all, get_by_id, get_by_param, get_all_by_param, create, update, remove };
