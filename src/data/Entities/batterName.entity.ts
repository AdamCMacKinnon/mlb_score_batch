import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('batter_name')
export class BatterName {
  @PrimaryColumn()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column()
  player_name: string;
}
