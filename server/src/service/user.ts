import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import UserRepository from "@/repository/user";
import ErrorResponse from "@/utils/errorResponse";
import { unable } from "@/constants/error";
import { generateHash, comparePassword } from "@/utils/hash";
@Service()
class UsersService {
  private userRepository: UserRepository;

  constructor(
    @InjectRepository(UserRepository) userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
  }

  async createUser({ id, password }: { id: string; password: string }) {
    try {
      const existUser = await this.userRepository.findUser(id);

      if (existUser) {
        throw new Error("already Exist");
      }

      const createdUser = await this.userRepository.createUser(
        id,
        generateHash(password)
      );
      const { idx, createdAt, updatedAt } = createdUser;
      return { idx, createdAt, updatedAt };
    } catch (e: any) {
      return { message: e.message };
    }
  }

  async signin({ id, password }: { id: string; password: string }) {
    try {
      const existUser = await this.userRepository.findUser(id);

      if (!existUser) {
        throw new Error("Id not exist");
      }
      if (comparePassword(existUser.password, password)) {
      } else {
        throw new Error("Password not match");
      }

      const { idx, createdAt, updatedAt } = existUser;
      return { idx, createdAt, updatedAt };
    } catch (e: any) {
      return { message: e.message };
    }
  }
}

export default UsersService;
