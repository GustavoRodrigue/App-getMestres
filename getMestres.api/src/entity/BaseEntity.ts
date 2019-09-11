import { Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({default: true})
    active: boolean;

    @Column({default: false})
    deleted: boolean;

    @CreateDateColumn({type: "timestamp"})
    upadateAt: Date;

    @CreateDateColumn({type: "timestamp"})
    createAt: Date;
}