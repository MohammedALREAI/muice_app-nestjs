import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { AbstractMusic } from '../../commons/classes/abstract-music';

import { Track } from '../track/track.entity';
import { SongType, SongLanguage } from '../../commons/enums/index.Enum';
import { SingerAlbum } from '../singer-album/singer-album.entity';

@Entity('songs')
@Unique(['name', 'source'])
export class Song extends AbstractMusic {

  @Column({
    type: 'enum',
    enum: SongType,
    array: false
  })
  type: SongType;

  @Column({
    type: 'enum',
    enum: SongLanguage,
    array: false
  })
  language: SongLanguage;

  @ManyToOne(type => SingerAlbum, singerAlbum => singerAlbum.songs, {
    eager: false
  })
  singerAlbum: SingerAlbum;

  @OneToMany(type => Track, track => track.playlist, {
    eager: true
  })
  tracks: Track[];

  // Foreign Key
  @Column()
  singerAlbumId: number;
}
