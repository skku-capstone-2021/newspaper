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
}

export default ScrapService;
