import { EntityRepository, Repository, getManager } from "typeorm";
import ArticleEntity from "@/entity/article";

@EntityRepository(ArticleEntity)
class ArticleRepository extends Repository<ArticleEntity> {
  async findArticleByDate(date: string) {
    const myquery = `select * from article where Date(date)='${date}'`;
    const articles = getManager().query(myquery);
    return articles;
  }
}

export default ArticleRepository;
