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

export const getInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleServiceInstance = Container.get(ArticleService);

    const ret = await articleServiceInstance.getInfo();

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, startDate, endDate, newspaper, category, keyword } =
      req.body;

    const articleServiceInstance = Container.get(ArticleService);

    const ret = await articleServiceInstance.search(
      title,
      startDate,
      endDate,
      newspaper,
      category,
      keyword
    );

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;

    const articleServiceInstance = Container.get(ArticleService);

    const ret = await articleServiceInstance.subscribe(user);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};
