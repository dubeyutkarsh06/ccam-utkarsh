import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { Category_Translation } from './category_translation.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Category_Translation, cTrans => cTrans.translation)
    categoryTranslations: Category_Translation[];

    @OneToMany(type => Question, question => question.category)
    questions: Question[];
}
