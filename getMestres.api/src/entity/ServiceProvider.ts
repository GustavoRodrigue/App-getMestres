import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";


@Entity()
export class ServiceProvider extends BaseEntity {

    @Column({ type: 'varchar', length:200})
    name: string;

    @Column({ type: 'varchar', length:200})
    photo: string;

    @Column({ type: 'varchar', length:200})
    email: string;

    @Column({ type: 'varchar', length:100})
    password: string;

    @Column({ type: 'varchar', length:8000, nullable: true})
    description: string;

    @Column({ type: 'varchar', length:100, nullable: true})
    address: string;

    @Column({ type: 'varchar', length:1000, nullable: true})
    addressComplement: string;

    @Column({ type: 'varchar', length:2})
    state: string;// estado

    @Column({ type: 'varchar', length:100, nullable: null})
    city: string;

    @Column({ type: 'varchar', length:20})
    zipCode: string;//cep

    @Column({ type: 'varchar', length:8000})
    citiesCare: string;// cidade atendidas

    @Column({ type: 'varchar', length:8000})
    categoriesCare: string;

    @Column({ type: 'varchar', length:50})
    phone: string;

   
}