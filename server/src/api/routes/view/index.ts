import { Router } from "express";
import { addView, getView, recommend } from "./controller";

const viewRouter = Router();

export default (router: Router) => {
  router.use("/view", viewRouter);

  viewRouter.post("/add", addView);

  viewRouter.post("/get", getView);

  viewRouter.post("/recommend", recommend);
};
