import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TranslatableString } from './translatableString.entity';

@Entity()
export class Translation {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => TranslatableString, t => t.translations)
    translatableStrings: TranslatableString[];
}
