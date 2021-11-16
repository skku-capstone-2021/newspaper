import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import ScrapService from "@/service/scrap";

export const addScrap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, article } = req.body;

    const scrapServiceInstance = Container.get(ScrapService);
    const ret = await scrapServiceInstance.addScrap({
      user: Number(user),
      article: Number(article),
    } as any);
    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};
