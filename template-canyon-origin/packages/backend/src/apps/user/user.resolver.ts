// import { Resolver, Mutation, Arg } from 'type-graphql';
// import { UserSettings } from './userSettings';
// import { UserSettingsInput } from './userSettingsInput';
import { UpdateUserSettingsService } from './services/update-user-settings.service';
import {Args, Mutation, Resolver} from "@nestjs/graphql";
// import {GetProjectsRequestModel} from "../project/models/request/get-projects.request.model";
import {UpdateUserSettingsRequestModel} from "./models/request/update-user-settings.request.model";
import {UpdateUserSettingsResponseModel} from "./models/response/update-user-settings.response.model";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../guards/gql-auth.guard";
import { GqlUser } from 'src/decorators/gql-user.decorator';
import {User} from "./models/user.model";
// import {GetProjectsRequestModel} from "../project/models/request/get-projects.request.model";

@Resolver(() => 'User')
export class UserResolver {
  constructor(
    private updateUserSettingsService: UpdateUserSettingsService
  ) {}

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateUserSettingsResponseModel)
  async updateUserSettings(
    @Args() args: UpdateUserSettingsRequestModel,
    // @GqlUser() user: User
  ): Promise<UpdateUserSettingsResponseModel> {
    return await this.updateUserSettingsService.invoke('1',args);
  }
}
