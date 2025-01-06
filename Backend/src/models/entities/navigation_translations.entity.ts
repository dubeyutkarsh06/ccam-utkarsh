import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm';
import {Translation} from "./translation.entity";

@Entity()
export class Navigation_translations {
    @PrimaryColumn()
    id: number;

    @Column()
    marker: string;

    @Column()
    translationsId: number;

    @OneToOne(type => Translation)
    @JoinColumn()
    translations: Translation[];

}
