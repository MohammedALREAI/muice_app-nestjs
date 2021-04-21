import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URI ,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    // check if the user exist on the database or not
    const { id } = profile;
    const user = await this.userRepository.findOne({
      where: {
        googleId: id,
      },
    });
    if (user) {
      const { emails } = profile;
      const jwt = this.authService.generateJwtToken(emails[0].value);
      done(null, { user, jwt });
    } else {
      const { user, jwt } = await this.authService.SignInGoogle(profile, id);
      done(null, { user, jwt });
    }
  }
}
