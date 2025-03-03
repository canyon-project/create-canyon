import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../prisma/prisma.service";
// import { UserSettings } from '../userSettings';
// import { UserSettingsInput } from '../userSettingsInput';

@Injectable()
export class UpdateUserSettingsService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }
  // 当前用户 currentUser
  async invoke(currentUser,args) {
    return this.prisma.user.update({
      where: {
        id: currentUser
      },
      data: {
        settings: {
          ...args
        }
      }
    }).then(r=>{
      if (r) {
        return {
          theme:'unknown',
        }
      } else {

        return {
          // @ts-ignore
          theme:r.settings.theme,
        }
      }
    })
  }
}
