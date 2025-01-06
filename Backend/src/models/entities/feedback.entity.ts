import { Entity, ManyToOne, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Translation } from './translation.entity';
import { AssessmentFeedback } from './assessmentFeedback.entity';
import { FeedbackIntro } from './feedbackIntro.entity';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @ManyToOne(type => Category)
    category: Category;

    @OneToMany(type => AssessmentFeedback, af => af.feedback)
    assessmentFeedback: AssessmentFeedback;

    @OneToOne(type => FeedbackIntro)
    @JoinColumn()
    feedbackIntro: FeedbackIntro;

    @ManyToMany(type => Translation)
    @JoinTable({name: 'gp_translation'})
    goodPractices: Translation[];

    @ManyToMany(type => Translation)
    @JoinTable({name: 'rec_translation'})
    recommnedations: Translation[];

    @ManyToMany(type => Translation)
    @JoinTable({name: 'tools_translation'})
    tools: Translation[];
}
