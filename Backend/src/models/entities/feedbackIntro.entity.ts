import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Translation } from './translation.entity';

@Entity()
export class FeedbackIntro {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Translation)
    @JoinTable({name: 'feedbackintro_text_translations'})
    translations: Translation[];

    @ManyToMany(type => Translation)
    @JoinTable({name: 'feedbackintro_lists_translations'})
    lists: Translation[];
}
