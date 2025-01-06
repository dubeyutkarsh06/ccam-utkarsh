import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Active_Section {

    @PrimaryColumn()
    id: number;
}
