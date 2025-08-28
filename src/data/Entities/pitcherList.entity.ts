import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pitcher_list')
export class PitcherList {
  @PrimaryColumn()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column()
  player_name: string;
}
