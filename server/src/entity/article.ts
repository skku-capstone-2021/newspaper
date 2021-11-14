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

  @Column("text", { nullable: true })
  title: string;

  @Column("text", { nullable: true })
  company: string;

  @Column("text", { nullable: true })
  category: string;

  @Column("simple-array", { nullable: true })
  keywords: string[];

  @Column("longtext", { nullable: true })
  content: string;

  @Column("longtext", { nullable: true })
  shortContent: string;

  @Column("text", { nullable: true })
  imgUrl: string;

  @Column("text", { nullable: true })
  date: string;

  @Column("float", { nullable: true })
  confidence: number;

  @Column("text", { nullable: true })
  result: string;

  @Column("simple-array", { nullable: true })
  recommend: string[];

  @Column("text", { nullable: true })
  url: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default ArticleEntity;
