import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category_Translation } from './category_translation.entity';
import { Question_Translation } from './question_translation.entity';
import { Answer_Translation } from './answer_translation.entity';
import { TranslatableString } from './translatableString.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Category_Translation, cTrans => cTrans.language)
    translationCategories: Category_Translation[];

    @OneToMany(type => Question_Translation, qTrans => qTrans.language)
    translationQuestions: Question_Translation[];

    @OneToMany(type => Answer_Translation, aTrans => aTrans.language)
    translations: Answer_Translation[];

    @OneToMany(type => TranslatableString, t => t.language)
    translatableStrings: TranslatableString[];
}
