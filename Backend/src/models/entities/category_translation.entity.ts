import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Language } from './language.entity';

@Entity()
export class Category_Translation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    translation: string;

    @Column()
    translationShort: string;

    @ManyToOne(type => Category, category => category.categoryTranslations)
    category: Category;

    @ManyToOne(type => Language, language => language.translationCategories)
    language: Language;
}
