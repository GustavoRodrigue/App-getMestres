import { BaseEntity } from "./BaseEntity";
import { Entity, Column } from "typeorm";

@Entity()
export class Category extends BaseEntity {

  @Column({ type: 'varchar', length: 500 })
  name: string

  @Column({ type: "varchar", length: 1000, nullable: true })
  description: string

}