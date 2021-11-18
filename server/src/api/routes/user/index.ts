import { Router } from "express";
import {
  handleCreateUser,
  handleSignin,
  getKeyword,
  saveKeywords,
} from "./controller";

const usersRouter = Router();

export default (router: Router) => {
  router.use("/user", usersRouter);

  usersRouter.post("/signup", handleCreateUser);

  usersRouter.post("/signin", handleSignin);

  usersRouter.post("/getKeyword", getKeyword);

  usersRouter.post("/saveKeywords", saveKeywords);
};
