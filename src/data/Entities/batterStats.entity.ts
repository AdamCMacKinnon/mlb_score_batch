import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('batter_stats')
export class BatterStats {
  @PrimaryColumn()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column()
  g: number;
  @Column()
  ab: number;
  @Column()
  pa: number;
  @Column()
  dbl: number;
  @Column()
  hr: number;
  @Column()
  r: number;
  @Column()
  rbi: number;
  @Column()
  sb: number;
  @Column()
  cs: number;
  @Column({ precision: 5, scale: 3 })
  avg: string;
  @Column({ precision: 5, scale: 3 })
  obp: string;
  @Column({ precision: 5, scale: 3 })
  slg: string;
  @Column({ precision: 5, scale: 3 })
  iso: string;
  @Column({ precision: 5, scale: 3 })
  babip: string;
  @Column({ precision: 5, scale: 3 })
  k_pct: string;
  @Column({ precision: 5, scale: 1 })
  bb_pct: string;
  @Column({ precision: 5, scale: 1, nullable: true })
  ev: string;
  @Column({ precision: 5, scale: 1, nullable: true })
  barrel_pct: string;
  @Column({ precision: 5, scale: 1, nullable: true })
  hard_hit_pct: string;
  @Column({ precision: 5, scale: 1, nullable: true })
  o_swing_pct: string;
  @Column({ precision: 5, scale: 1, nullable: true })
  z_swing_pct: string;
}
