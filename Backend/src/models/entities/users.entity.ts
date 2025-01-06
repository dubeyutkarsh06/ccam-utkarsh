import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class users {

    @PrimaryColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}
