import { Entity, ManyToOne, Column } from 'typeorm';
import { Language } from './language.entity';
import { Translation } from './translation.entity';

@Entity()
export class TranslatableString {
    @ManyToOne(type => Translation, t => t.translatableStrings, { primary: true })
    translations: Translation[];

    @ManyToOne(type => Language, l => l.translatableStrings, { primary: true })
    language: Language;

    @Column({length: 2000})
    value: string;

    @Column({length: 2000})
    url: string;
}
