import { Injectable } from '@nestjs/common';
import { Session } from './session.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class SessionRepostiory extends Repository<Session> {
  constructor(private dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }
}
