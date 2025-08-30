import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pitcher_stats')
export class PitcherStats {
  @PrimaryColumn()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column()
  wins: number;
  @Column()
  loss: number;
  @Column()
  sv: number;
  @Column()
  games: number;
  @Column()
  games_started: number;
  @Column('numeric', { precision: 5, scale: 1 })
  innings_pitched: number;
  @Column('numeric', { precision: 5, scale: 2 })
  k_per_9: string;
  @Column('numeric', { precision: 5, scale: 2 })
  bb_per_9: string;
  @Column('numeric', { precision: 5, scale: 2 })
  hr_per_9: string;
  @Column('numeric', { precision: 5, scale: 3 })
  babip_against: string;
  @Column('numeric', { precision: 5, scale: 2 })
  lob_pct: string;
  @Column('numeric', { precision: 5, scale: 2 })
  gb_pct: string;
  @Column('numeric', { precision: 5, scale: 2 })
  hr_fb: string;
  @Column('numeric', { precision: 5, scale: 1, nullable: true })
  velo_fb: string;
  @Column('numeric', { precision: 5, scale: 2 })
  era: string;
  @Column('numeric', { precision: 5, scale: 2 })
  x_era: string;
  @Column('numeric', { precision: 5, scale: 2 })
  fip: string;
  @Column('numeric', { precision: 5, scale: 2 })
  x_fip: string;
  @Column('numeric', { precision: 5, scale: 2 })
  f_war: string;
}
