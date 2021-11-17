import { EntityRepository, Repository, getManager } from "typeorm";
import ViewEntity from "@/entity/view";

@EntityRepository(ViewEntity)
class ViewRepository extends Repository<ViewEntity> {
  async findView(user: any, article: any) {
    const view = await this.findOne({
      where: { user: user, article: article },
    });
    return view;
  }

  async createView(user: any, article: any) {
    const view = new ViewEntity();
    view.user = user;
    view.article = article;
    const newView = await this.save(view);
    return newView;
  }

  async getView(user: any) {
    const views = await this.find({
      relations: ["article"],
      where: { user: user },
    });
    return views;
  }
}

export default ViewRepository;
