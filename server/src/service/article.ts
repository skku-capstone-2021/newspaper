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

  async search(
    title: any,
    startDate: any,
    endDate: any,
    newspaper: any,
    category: any,
    keyword: any
  ) {
    try {
      interface news {
        category: any;
        company: any;
        confidence: any;
        content: any;
        created_at: any;
        date: any;
        idx: any;
        img_url: any;
        keywords: any;
        recommend: any;
        result: any;
        short_content: any;
        title: any;
        updated_at: any;
        url: any;
      }

      let articles = await this.articleRepository.search(
        title,
        startDate,
        endDate,
        newspaper,
        category,
        keyword
      );

      articles = articles.filter((item: news) => item.img_url !== null);

      return { articles };
    } catch (e: any) {
      return { message: e.message };
    }
  }
}

export default ArticleService;
