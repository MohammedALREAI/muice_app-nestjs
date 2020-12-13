import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractMusic } from '../../commons/classes/abstract-music';
import { MusicType } from '../../commons/enums/index.Enum';
import { MusicianAlbum } from '../musician-album/musician-album.entity';
import { Track } from '../track/track.entity';
import { IsEnum } from 'class-validator';


@Entity('musics')
export class Music extends AbstractMusic {

  @IsEnum(MusicType,{each:false})
  @Column({
    type: 'enum',
    enum: MusicType,
    array: false
  })
  type: MusicType;

  @ManyToOne(type => MusicianAlbum,
    musicianAlbum => musicianAlbum.musics, {
    eager: false,
  })
  musicianAlbum: MusicianAlbum;

  @OneToMany(type => Track, track => track.playlist, {
    eager: true
  })
  tracks: Track[];

  // Foreign Key
  @Column()
  musicianAlbumId: number
}
