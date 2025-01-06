import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ScoringCategory } from './scoringCategory.entity';
import { Translation } from './translation.entity';

@Entity()
export class ScoringDefaultChart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    percentage: number;

    @ManyToOne(type => ScoringCategory)
    category: ScoringCategory[];

    @ManyToOne(type => Translation)
    translation: Translation[];
}
