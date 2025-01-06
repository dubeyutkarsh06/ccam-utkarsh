import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Filter_Add } from './filterAdd.entity';
import { Forwarding } from './forwarding.entity';
import { Question } from './question.entity';

@Entity()
export class Filter {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Filter_Add, f => f.filter)
    filtersAdd: Filter_Add;

    @ManyToMany(type => Forwarding, f => f.filters)
    forwardings: Forwarding[];

    @ManyToMany(type => Question, q => q.filters)
    questions: Question[];
}
