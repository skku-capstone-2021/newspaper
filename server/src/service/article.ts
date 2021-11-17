import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import ArticleRepository from "@/repository/article";
import ErrorResponse from "@/utils/errorResponse";
import { unable } from "@/constants/error";
@Service()
class ArticleService {
  private articleRepository: ArticleRepository;

  constructor(
    @InjectRepository(ArticleRepository) articleRepository: ArticleRepository
  ) {
    this.articleRepository = articleRepository;
  }

  async getMain({ date }: { date: string }) {
    try {
      const articles = await this.articleRepository.findArticleByDate(date);

      //article 5개 솎아 내야 함 (등급에 따라하면 될듯)

      const ret = [];

      for (let i = 0; i < articles.length; i++) {
        if (articles[i].img_url) {
          ret.push(articles[i]);
        }

        if (ret.length === 5) break;
      }

      return { articles: ret };
    } catch (e: any) {
      return { message: e.message };
    }
  }

  async getInfo() {
    try {
      const articles = await this.articleRepository.findAll();

      const newspapers = [] as String[];
      const categorys = [] as String[];

      articles.forEach((item) => {
        if (!newspapers.includes(item.company)) {
          newspapers.push(item.company);
        }

        if (!categorys.includes(item.category)) {
          categorys.push(item.category);
        }
      });

      newspapers.sort();
      categorys.sort();
      return { newspapers, categorys };
    } catch (e: any) {
      return { message: e.message };
    }
  }
}

export default ArticleService;
