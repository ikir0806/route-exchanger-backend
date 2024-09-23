import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpirations: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.userService.findById(+payload.id);

    if (!user) {
      throw new UnauthorizedException('Ошибка доступа');
    }

    return {
      id: user.id,
    };
  }
}
