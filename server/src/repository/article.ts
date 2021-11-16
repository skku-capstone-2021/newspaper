import { EntityRepository, Repository, getManager } from "typeorm";
import ArticleEntity from "@/entity/article";

@EntityRepository(ArticleEntity)
class ArticleRepository extends Repository<ArticleEntity> {
  async findArticleByDate(date: string) {
    const myquery = `select * from article where Date(date)='${date}'`;
    const articles = getManager().query(myquery);
    return articles;
  }

  async findByIdx(idx: number) {
    const article = await this.findOne({ where: { idx } });
    return article;
  }
}

export default ArticleRepository;
