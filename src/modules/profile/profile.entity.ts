import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Gender } from '../../commons/enums/gender.enum';
import { User } from '../auth/entities/user.entity';
import { Favorite } from '../favorite/favorite.entity';
import { IsDefined, IsEmail, IsBoolean, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

@Entity('profiles')
@Unique(['phone'])
export class Profile extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;
  @IsDefined()
  @IsString()
  @Column()
  firstName: string;
  @IsDefined()
  @IsString()
  @Column()
  lastName: string;
  @IsOptional()

  // @IsEnum(gender, { each: String })
  @Column({
    nullable: true
  })
  gender: Gender;
  @IsNumber()
  @IsDefined()
  @Column({
    nullable: true
  })
  age: number;

  @Column({
    nullable: true
  })
  country: string;

  @Column({
    nullable: true
  })
  city: string;

  @Column({
    nullable: true
  })
  address: string;

  @Column({
    nullable: true
  })
  phone: string;

  // IT OPTINLA     nullable: true

  @Column({
    nullable: true
  })
  image: string;


  @OneToOne(type => User, user => user.profile, {
    eager: true
  })
  user: User;

  @OneToOne(type => Favorite, favorite => favorite.profile)
  @JoinColumn()
  favorite: Favorite;

  @Column()
  favoriteId: number;

}
