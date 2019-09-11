import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { RequestStatus } from "./enum/RequestStatus";
import { Customer } from "./Customer";
import { ServiceProvider } from "./ServiceProvider";
import { SubCategory } from "./SubCategory";


@Entity()
export class RequestOrder extends BaseEntity {

    @Column({ type: 'varchar', length:100})
    longlat: string;

    @Column({ type: 'varchar', length:200})
    title: string;

    @Column({ type: 'text'})
    description: string;

    @Column()
    statusOrder: RequestStatus;

    @ManyToOne(()=> Customer, { eager: true })// auto populate
    customer: Customer;

    @ManyToOne(()=> SubCategory, { eager: true })// auto populate
    subCategory: SubCategory;

    @ManyToOne(()=> ServiceProvider, { eager: true, nullable: true })// auto populate
    serviceProvider: ServiceProvider;
   
}