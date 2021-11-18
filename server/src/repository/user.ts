import { EntityRepository, Repository } from "typeorm";
import UserEntity from "@/entity/user";

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async createUser(id: string, password: string) {
    const user = new UserEntity();
    user.id = id;
    user.password = password;
    const newUser = await this.save(user);
    return newUser;
  }

  async findUser(id: string) {
    const user = await this.findOne({ where: { id } });
    return user;
  }

  async findByIdx(idx: number) {
    const user = await this.findOne({ where: { idx } });
    return user;
  }

  async getKeyword(idx: number) {
    const keywords = await this.findOne({
      select: ["subscribe"],
      where: { idx },
    });
    return keywords;
  }

  async saveKeywords(user: UserEntity, keywords: string[]) {
    user.subscribe = keywords;
    await this.save(user);
    return keywords;
  }
}

export default UserRepository;
