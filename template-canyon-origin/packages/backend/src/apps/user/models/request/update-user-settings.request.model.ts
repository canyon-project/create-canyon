import {ArgsType, Field, Int} from "@nestjs/graphql";

@ArgsType()
export class UpdateUserSettingsRequestModel {
  @Field(() => String, {
    description: "主题",
  })
  theme: string;
}
