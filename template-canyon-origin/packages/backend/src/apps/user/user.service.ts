import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {UserModel} from "./models/user.model";

// import { User as DbUser } from "../../../generated/client";
// import { User } from "./models/user.model";
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  /**
   * 将 prisma 用户对象转换为用户对象
   *
   * @param dbUser Prisma User object
   * @returns  User object
   */
  convertDbUserToUser(dbUser): Promise<UserModel> {
    return this.prisma.user.findFirst({
      where: {
        id: String(dbUser.id),
      },
    }).then(res=>{
      if (res){
        return {
          id: res.id,
          password: res.password,
          nickname: res.nickname,
          avatar: res.avatar,
          email: res.email,
          favor: res.favor,
          createdAt: res.createdAt,
          settings: {
            theme: 'dark',
            language: 'zh-CN'
          }
        }
      } else {
        throw new Error('User not found')
      }
    })
  }
}
