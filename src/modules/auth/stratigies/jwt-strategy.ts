import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import myconfig from '../../../config';
const config = myconfig().AuthJwt;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SOMEtEXTFROyou',
    });
  }

  async validate(payload: { email: string }): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User Is Not Authorized');
    }
    return user;
  }
}
