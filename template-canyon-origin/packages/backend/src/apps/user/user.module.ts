import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UpdateUserSettingsService } from './services/update-user-settings.service';
import {PrismaModule} from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UpdateUserSettingsService],
})
export class UserModule {}
