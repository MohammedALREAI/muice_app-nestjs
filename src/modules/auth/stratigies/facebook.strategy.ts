import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../auth.service';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {
    super({
      clientID:process.env.FACEBOOK_SECRET_ID,
      clientSecret:process.env.FACEBOOK_SECRET_ID,
      callbackURL:process.env.CALL_BACK_URI,
      scope: ['email'],
      profileFields: ['id', 'displayName', 'email', 'photos', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    // check if the user exist on the database or not
    const { id } = profile;
    const user = await this.userRepository.findOne({
      where: {
        facebookId: id,
      },
    });
    if (user) {
      const { emails } = profile;
      const jwt = this.authService.generateJwtToken(emails[0].value);
      done(null, { user, jwt });
    } else {
      const { user, jwt } = await this.authService.SingInFacebook(profile, id);
      done(null, { user, jwt });
    }
  }
}
