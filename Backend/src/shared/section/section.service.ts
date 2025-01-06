import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Active_Section } from '../../models/entities/active_section.entity';

@Injectable()
export class SectionService {
    constructor(
        private readonly connection: Connection,
    ) {}

    public getActiveSectionId() {
        return this.connection
        .getRepository(Active_Section)
        .createQueryBuilder('as')
        .getOne();
    }
}
