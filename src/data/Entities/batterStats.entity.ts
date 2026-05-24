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
  @Column('numeric', { precision: 5, scale: 3 })
  avg: number;
  @Column('numeric', { precision: 5, scale: 3 })
  obp: number;
  @Column('numeric', { precision: 5, scale: 3 })
  slg: number;
  @Column('numeric', { precision: 5, scale: 3 })
  iso: number;
  @Column('numeric', { precision: 5, scale: 3 })
  babip: number;
  @Column('numeric', { precision: 5, scale: 3, nullable: true })
  k_pct: number;
  @Column('numeric', { precision: 5, scale: 3, nullable: true })
  bb_pct: number;
  @Column('numeric', { precision: 5, scale: 1, nullable: true })
  ev: number;
  @Column('numeric', { precision: 5, scale: 3, nullable: true })
  barrel_pct: number;
  @Column('numeric', { precision: 5, scale: 3, nullable: true })
  hard_hit_pct: number;
  @Column('numeric', { precision: 5, scale: 3, nullable: true })
  o_swing_pct: number;
  @Column('numeric', { precision: 5, scale: 3, nullable: true })
  z_swing_pct: number;
}
