import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Translation } from './translation.entity';
import { Scoring } from './scoring.entity';

@Entity()
export class ScoringCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Translation)
    translation: Translation;

    @Column()
    type: string;

    @OneToMany(type => Scoring, s => s.category)
    scorings: Scoring[];
}
