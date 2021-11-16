import { Router } from "express";
import { addScrap } from "./controller";

const scrapRouter = Router();

export default (router: Router) => {
  router.use("/scrap", scrapRouter);

  scrapRouter.post("/add", addScrap);
};
