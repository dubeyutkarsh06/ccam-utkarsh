import {
    Entity,
    PrimaryColumn,
    Column,
    JoinColumn,
    ManyToMany, ManyToOne
} from 'typeorm';
import {Translation} from "./translation.entity";

@Entity()
export class Resultpage {

    @PrimaryColumn()
    id: number;

    @Column()
    marker: string;

    @Column()
    assessmentFinishId: number;

    @Column()
    translationsId: number;

    @ManyToOne(type => Translation)
    @JoinColumn()
    translations: Translation[];


}
