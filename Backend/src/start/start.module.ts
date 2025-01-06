import { Module } from '@nestjs/common';
import { StartController } from './controller/start.controller';
import { StartService } from './service/start.service';
import { Start_queryService } from "../shared/start/start_query.service";
import { LanguageService } from "../shared/language/language.service";

@Module({
  controllers: [StartController],
  providers: [StartService, Start_queryService, LanguageService]
})
export class StartModule {}
