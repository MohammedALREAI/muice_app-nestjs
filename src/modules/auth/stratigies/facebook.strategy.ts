import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../auth.service';
import { oAuthFacebook } from '../../../config';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private userRepository: UserRepository, private authService: AuthService) {
    super({
      clientID: oAuthFacebook.FACEBOOK_CLIENT_ID,
      clientSecret: oAuthFacebook.FACEBOOK_SECRET_ID,
      callbackURL: oAuthFacebook.CALL_BACK_URI,
      scope: oAuthFacebook.SCOPE,
      profileFields: ['id', 'displayName', 'email', 'photos', 'name']
    });
  }

  async validate(accessToken: string,
    refreshToken: string, profile: any, done: any) {
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
