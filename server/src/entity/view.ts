import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from "typeorm";

import UserEntity from "./user";
import ArticleEntity from "./article";

@Unique(["article", "user"])
@Entity({ name: "view" })
class ViewEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.idx, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "user_idx" })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (articleEntity) => articleEntity.idx, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "article_idx" })
  article: ArticleEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default ViewEntity;
