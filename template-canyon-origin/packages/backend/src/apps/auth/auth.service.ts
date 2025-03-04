import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
  }
  async validateUser(username: string, password: string): Promise<any> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          email: username,
          password,
        },
      })) || null
    );
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
    };
    // AuthService.login 第三步：存储信息
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async passwordLogin(params) {
    const isHasUser = await this.prisma.user.findFirst({
      where: {
        email: params.username,
        password: params.password,
      },
    });
    if (!isHasUser) {
      throw new UnauthorizedException();
    }
    return this.login({
      username: isHasUser.email,
      id: isHasUser.id,
    });
  }
}
