import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user" })
class UserEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ length: 320 })
  id: string;

  @Column("text")
  password: string;

  @Column("simple-array", { nullable: true })
  subscribe: string[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

export default UserEntity;
