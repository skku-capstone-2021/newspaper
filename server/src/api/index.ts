import { Router } from "express";
import version from "./routes/version";
import user from "./routes/user";
import article from "./routes/Article";

export default () => {
  const router = Router();

  version(router);
  user(router);
  article(router);
  return router;
};
