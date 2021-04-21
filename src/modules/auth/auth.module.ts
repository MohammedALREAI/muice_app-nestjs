import { Config } from './../../config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailVerification } from './entities/email-verification.entity';
import { JwtStrategy } from './stratigies/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ForgottenPassword } from './entities/forgotten-password.entity';
import { ProfileModule } from '../profile/profile.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { ChatModule } from '../../shared/modules/chat/chat.module';
import { NotificationModule } from '../notification/notification.module';
import { GoogleStrategy } from './stratigies/google.strategy';
import { FacebookStrategy } from './stratigies/facebook.strategy';
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: Config.Auth.Jwt.secretKey,
      signOptions: {
        expiresIn:  Config.Auth.Jwt.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      EmailVerification,
      ForgottenPassword,
    ]),
    ProfileModule,
    FavoriteModule,
    PlaylistModule,
    NotificationModule,
    forwardRef(() => ChatModule),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, FacebookStrategy,ConfigService],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}
