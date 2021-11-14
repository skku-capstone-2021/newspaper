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
}

export default UserRepository;
