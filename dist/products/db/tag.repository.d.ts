import { Repository, DataSource } from 'typeorm';
import { Tag } from './tag.entity';
export declare class TagRepository extends Repository<Tag> {
    private dataSource;
    constructor(dataSource: DataSource);
    findTagsByName(names: string[]): Promise<Tag[]>;
}
