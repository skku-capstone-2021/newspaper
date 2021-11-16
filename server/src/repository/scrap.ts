import { EntityRepository, Repository, getManager } from "typeorm";
import ScrapEntity from "@/entity/scrap";

@EntityRepository(ScrapEntity)
class ScrapRepository extends Repository<ScrapEntity> {
  async findScrap(user: any, article: any) {
    const scrap = await this.findOne({
      where: { user: user, article: article },
    });
    return scrap;
  }

  async createScrap(user: any, article: any) {
    const scrap = new ScrapEntity();
    scrap.user = user;
    scrap.article = article;
    const newScrap = await this.save(scrap);
    return newScrap;
  }
}

export default ScrapRepository;
