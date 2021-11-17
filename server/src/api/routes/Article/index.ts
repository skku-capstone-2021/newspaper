import { Router } from "express";
import { getMain, getInfo, search } from "./controller";

const articleRouter = Router();

export default (router: Router) => {
  router.use("/article", articleRouter);

  articleRouter.post("/main", getMain);

  articleRouter.post("/info", getInfo);

  articleRouter.post("/search", search);
};
