import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm';
import {Translation} from "./translation.entity";

@Entity()
export class question_component_translation {
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
