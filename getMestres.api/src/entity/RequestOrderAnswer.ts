import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { ServiceProvider } from "./ServiceProvider";
import { SubCategory } from "./SubCategory";
import { RequestOrder } from "./RequestOrder";
import { Question } from "./Question";


@Entity()
export class RequestOrderAnswer extends BaseEntity {

    @Column({ type: 'text', nullable: false})
    answer: string;

    @ManyToOne(()=> RequestOrder, { eager: true })// auto populate
    requestOrder: RequestOrder;

    @ManyToOne(()=> Question, { eager: true })// auto populate
    question: Question;

}