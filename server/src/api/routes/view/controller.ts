import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import ViewService from "@/service/view";

export const addView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, article } = req.body;

    const viewServiceInstance = Container.get(ViewService);
    const ret = await viewServiceInstance.addView({
      user: Number(user),
      article: Number(article),
    } as any);
    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const getView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;

    const viewServiceInstance = Container.get(ViewService);
    const ret = await viewServiceInstance.getView({
      user: Number(user),
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const recommend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;

    const viewServiceInstance = Container.get(ViewService);
    const ret = await viewServiceInstance.recommend({
      user: Number(user),
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};
