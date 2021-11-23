import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import ViewRepository from "@/repository/view";
import UserRepository from "@/repository/user";
import ArticleRepository from "@/repository/article";
import ErrorResponse from "@/utils/errorResponse";
import { unable } from "@/constants/error";
import view from "@/api/routes/view";
@Service()
class ScrapService {
  private viewRepository: ViewRepository;

  private userRepository: UserRepository;

  private articleRepository: ArticleRepository;

  constructor(
    @InjectRepository(ViewRepository) viewRepository: ViewRepository,
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @InjectRepository(ArticleRepository) articleRepository: ArticleRepository
  ) {
    this.viewRepository = viewRepository;
    this.userRepository = userRepository;
    this.articleRepository = articleRepository;
  }

  async addView({ user, article }: { user: number; article: number }) {
    try {
      const foundUser = await this.userRepository.findByIdx(user);
      const foundArticle = await this.articleRepository.findByIdx(article);

      const existView = await this.viewRepository.findView(
        foundUser,
        foundArticle
      );

      if (existView) {
        throw new Error("already checked");
      }

      const createdView = await this.viewRepository.createView(
        foundUser,
        foundArticle
      );

      const { idx, createdAt, updatedAt } = createdView;
      return { idx, createdAt, updatedAt };
    } catch (e: any) {
      return { message: e.message };
    }
  }

  async getView({ user }: { user: number }) {
    try {
      const foundUser = await this.userRepository.findByIdx(user);

      const views = await this.viewRepository.getView(foundUser);

      return views;
    } catch (e: any) {
      return { message: e.message };
    }
  }

  async recommend({ user }: { user: number }) {
    const parsing = (keystr: any) => {
      if (typeof keystr === "string") {
        let sliced = keystr.slice(1, keystr.length - 1);
        sliced = sliced.replace(/'/gi, "");
        sliced = sliced.replace(/ /gi, "");
        return sliced.split(",");
      }

      if (keystr[0][0] === "[") {
        for (let i = 0; i < keystr.length; i += 1) {
          if (i === 0) {
            keystr[i] = keystr[i].slice(2, keystr[i].length - 1);
          } else if (i === keystr.length - 1) {
            keystr[i] = keystr[i].slice(2, keystr[i].length - 2);
          } else {
            keystr[i] = keystr[i].slice(2, keystr[i].length - 1);
          }
        }
        return keystr;
      }
      return keystr;
    };

    try {
      const foundUser = await this.userRepository.findByIdx(user);

      const views = await this.viewRepository.getView(foundUser);
      const articles = [] as any;

      views.forEach((item) => {
        articles.push(item.article.idx);
      });

      if (views.length === 1 || view.length === 2) {
        return [];
      }

      const recommends: any = await this.articleRepository.getRecommend(
        articles
      );
      const target = [] as number[];
      recommends.forEach((item: string) => {
        const temp = JSON.parse(item);

        temp.forEach((num: number) => {
          if (!target.includes(num)) {
            target.push(num);
          }
        });
      });
      let result: any = [];
      result = await this.articleRepository.findall(target);

      result = result.filter((item: any) => {
        return item.imgUrl !== null;
      });
      return result;
    } catch (e: any) {
      return { message: e.message };
    }
  }
}

export default ScrapService;
