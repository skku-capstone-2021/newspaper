import { Router } from "express";
import version from "./routes/version";
import user from "./routes/user";
import article from "./routes/article";
import scrap from "./routes/scrap";
import view from "./routes/view";

export default () => {
  const router = Router();

  version(router);
  user(router);
  article(router);
  scrap(router);
  view(router);

  return router;
};
