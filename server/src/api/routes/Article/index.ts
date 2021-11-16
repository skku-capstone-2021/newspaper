import { Router } from "express";
import { getMain } from "./controller";

const articleRouter = Router();

export default (router: Router) => {
  router.use("/article", articleRouter);

  articleRouter.post("/main", getMain);
};
