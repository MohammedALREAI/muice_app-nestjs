import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BadRequestException, ForbiddenException, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Role } from '../../../commons/enums/role.enum';
import { EmailLoginDto } from '../dto/email-login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.findOne({ email });
      if (user) {
        return user
      }
      throw new NotFoundException('email does not exist in the database');

    } catch (e) {
      throw new InternalServerErrorException('there are some error in server ')

    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.findOne({ username });
      if (user) {
        return user
      }
      throw new NotFoundException('email does not exist in the database');

    } catch (e) {
      throw new InternalServerErrorException('there are some error in server ')


    }
  }

  async validateUserPassword(emailLoginDto: EmailLoginDto): Promise<{ email: string, user: User }> {
    const { email, password } = emailLoginDto;

    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User does not exist in the database');
      }
      if (!user.password) {
        const errMessage = `You Cannot login from this gate, it's only for the main users,
      use the google or facebook gateways to login`;
        throw new ConflictException(errMessage, errMessage);
      }
      const comparePassword = user.comparePassword(password);
      if (comparePassword) {
        return { email, user };
      }
      else {
        throw new BadRequestException('Your Password in incorrect, please enter another one');

      }

    } catch (e) {
      throw new InternalServerErrorException('there are some error in server ')

    }

  }

  async validateAdminPassword(emailLoginDto: EmailLoginDto) {
    const { email, password } = emailLoginDto;
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist in the database');
    }
    const isAdmin = (): boolean => user.roles.some(role => role === Role.ADMIN);
    if (!isAdmin()) {
      throw new ForbiddenException('This Resource Is Forbidden');
    }
    if (user) {
      return { email, user };
    } else {
      throw new BadRequestException('Your Password in incorrect, please enter another one');
    }
  }


}


