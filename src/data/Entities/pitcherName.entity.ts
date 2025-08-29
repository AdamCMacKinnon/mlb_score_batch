import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pitcher_name')
export class PitcherName {
  @PrimaryColumn()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column()
  player_name: string;
}
