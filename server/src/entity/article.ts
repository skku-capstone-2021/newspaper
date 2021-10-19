import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "article" })
class ArticleEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column("text")
  title: string;

  @Column("text")
  company: string;

  @Column("text")
  category: string;

  @Column("simple-array")
  keywords: string[];

  @Column("longtext")
  content: string;

  @Column("longtext")
  shortContent: string;

  @Column("text")
  imgUrl: string;

  @Column("text")
  date: string;

  @Column("text")
  grade: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default ArticleEntity;
