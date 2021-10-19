import { ObjectLiteral } from "typeorm";
import UserEntity from "@/entity/user";
import ArticleEntity from "@/entity/article";
import ScrapEntity from "@/entity/scrap";
import ViewEntity from "@/entity/view";

import dependencyInjector, { DependencyInfo } from "./dependencyInjector";

const entityInjector = () => {
  const entities: DependencyInfo<ObjectLiteral>[] = [
    { name: "userEntity", dependency: new UserEntity() },
    { name: "articleEntity", dependency: new ArticleEntity() },
    { name: "scrapEntity", dependency: new ScrapEntity() },
    { name: "viewEntity", dependency: new ViewEntity() },
  ];

  dependencyInjector<ObjectLiteral>(entities);
};

export default entityInjector;
