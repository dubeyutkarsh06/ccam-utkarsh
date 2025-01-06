import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Assessment_Type } from './assessment_type.entity';
import { Translation } from './translation.entity';
import {type} from "os";

@Entity()
export class AssessmentFinish {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Assessment_Type)
    assessment: Assessment_Type;

}
