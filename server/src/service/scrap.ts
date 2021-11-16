import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import ScrapRepository from "@/repository/scrap";
import UserRepository from "@/repository/user";
import ArticleRepository from "@/repository/article";

import ErrorResponse from "@/utils/errorResponse";
import { unable } from "@/constants/error";
@Service()
class ScrapService {
  private scrapRepository: ScrapRepository;

  private userRepository: UserRepository;

  private articleRepository: ArticleRepository;

  constructor(
    @InjectRepository(ScrapRepository) scrapRepository: ScrapRepository,
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @InjectRepository(ArticleRepository) articleRepository: ArticleRepository
  ) {
    this.scrapRepository = scrapRepository;
    this.userRepository = userRepository;
    this.articleRepository = articleRepository;
  }

  async addScrap({ user, article }: { user: number; article: number }) {
    try {
      const foundUser = await this.userRepository.findByIdx(user);
      const foundArticle = await this.articleRepository.findByIdx(article);

      const existScrap = await this.scrapRepository.findScrap(
        foundUser,
        foundArticle
      );

      if (existScrap) {
        throw new Error("already scraped");
      }

      const createdScrap = await this.scrapRepository.createScrap(
        foundUser,
        foundArticle
      );

      const { idx, createdAt, updatedAt } = createdScrap;
      return { idx, createdAt, updatedAt };
    } catch (e: any) {
      return { message: e.message };
    }
  }
}

export default ScrapService;
