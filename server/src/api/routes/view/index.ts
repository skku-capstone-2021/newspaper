import { Router } from "express";
import { addView, getView } from "./controller";

const viewRouter = Router();

export default (router: Router) => {
  router.use("/view", viewRouter);

  viewRouter.post("/add", addView);

  viewRouter.post("/get", getView);
};
