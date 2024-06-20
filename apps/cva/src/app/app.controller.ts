import { Controller, Get } from '@nestjs/common';

import { AppService, GetSettingDto } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { JOBS } from '@rahataid/cva-extensions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: JOBS.SETTINGS.LIST, uuid: process.env.PROJECT_ID })
  listSettings() {
    return this.appService.listSettings();
  }

  @MessagePattern({ cmd: JOBS.SETTINGS.GET, uuid: process.env.PROJECT_ID })
  getSettings(dto: GetSettingDto) {
    return this.appService.getSettings(dto);
  }
}
