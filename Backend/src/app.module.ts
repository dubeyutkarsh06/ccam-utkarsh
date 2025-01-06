import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationModule } from './navigation/navigation.module';
import { QuestionsModule } from './questions/questions.module';
import { ScoringModule } from './scoring/scoring.module';
import { RecordModule } from './record/record.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MiscModule } from './misc/misc.module';
import { AuthModule } from './auth/auth.module';
import { StartModule } from './start/start.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [process.env.TYPEORM_ENTITIES],
      synchronize: true,
      logging: true,
    }),
    NavigationModule,
    QuestionsModule,
    ScoringModule,
    RecordModule,
    FeedbackModule,
    MiscModule,
    AuthModule,
    StartModule,
    StatisticModule,
    CacheModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
