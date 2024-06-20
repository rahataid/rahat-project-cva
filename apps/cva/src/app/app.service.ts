import { Injectable } from '@nestjs/common';
import { SettingsService } from '@rumsan/settings';

export class GetSettingDto {
  // @IsString()
  // @IsNotEmpty()
  name!: string;
}

export const lowerCaseObjectKeys = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    // Return the value if it's not an object
    return obj;
  }

  if (Array.isArray(obj)) {
    // Process each element in the array
    return obj.map(lowerCaseObjectKeys);
  }

  // Process each key-value pair in the object
  const lowerCaseObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      lowerCaseObj[key.toLowerCase()] = lowerCaseObjectKeys(obj[key]);
    }
  }
  return lowerCaseObj;
};

@Injectable()
export class AppService {
  constructor(private readonly settingService: SettingsService) {
    // this.refreshSettings();
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async listSettings() {
    const res = await this.settingService.listAll();
    const lowerCaseRes = lowerCaseObjectKeys(res);
    return lowerCaseRes;
  }
  async getSettings(dto: GetSettingDto) {
    const { name } = dto;
    const res = await this.settingService.getPublic(name);
    return lowerCaseObjectKeys(res);
  }
}
