import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import ArticleService from "@/service/article";

export const getMain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.body;

    const articleServiceInstance = Container.get(ArticleService);

    const ret = await articleServiceInstance.getMain({
      date,
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};
