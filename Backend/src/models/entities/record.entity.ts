import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Record {
    @PrimaryColumn()
    uuid: string;

    @Column({type: 'text'})
    results: string;

    @Column({type: "date", nullable: true})
    timestamp: Date;

    @Column({type: "int"})
    languageId: number;

    @Column({type: "int"})
    assessmentId: number;
}
