import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('fg_batter_projections')
export class FgBatterProjections {
  @PrimaryColumn()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column()
  p_g: number;
  @Column()
  p_ab: number;
  @Column()
  p_pa: number;
  @Column()
  p_hr: number;
  @Column()
  p_r: number;
  @Column()
  p_rbi: number;
  @Column()
  p_sb: number;
  @Column()
  p_cs: number;
  @Column('numeric', { precision: 5, scale: 3 })
  p_avg: string;
  @Column('numeric', { precision: 5, scale: 3 })
  p_obp: string;
}
