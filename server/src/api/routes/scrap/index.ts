import { Router } from "express";
import { addScrap, getScrap } from "./controller";

const scrapRouter = Router();

export default (router: Router) => {
  router.use("/scrap", scrapRouter);

  scrapRouter.post("/add", addScrap);

  scrapRouter.post("/get", getScrap);
};
