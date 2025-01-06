import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Assessment_Type } from './assessment_type.entity';
import { Filter } from './filter.entity';

@Entity()
export class Forwarding {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Assessment_Type, at => at.forwardings)
    assessmentType: Assessment_Type;

    @ManyToMany(type => Filter, f => f.forwardings)
    @JoinTable()
    filters: Filter[];
}
