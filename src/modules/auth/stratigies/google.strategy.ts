// import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as request from 'supertest';
import { Strategy } from 'passport-google-oauth20';

import { PassportStrategy } from "@nestjs/passport";

import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../auth.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NextFunction, Request } from 'express';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userRepository: UserRepository, private authService: AuthService) {
    super({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URI,
      clientID: process.env.GOOGLE_CLIENT_ID,
      scope: process.env.SCOPE,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, accessToken: string,
    refreshToken: string, profile: any, done: any) {
    // check if the user exist on the database or not
    const { id } = profile;
    // eslint-disable-next-line prefer-const
    let user = await this.userRepository.findOne({
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




