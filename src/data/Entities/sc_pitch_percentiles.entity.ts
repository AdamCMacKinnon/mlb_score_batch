import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sc_pitch_percentiles')
export class SCPitchPercentiles {
  // This entity is intentionally left empty as it serves as a marker for the 'sc_pitch_percentiles' table.
  @PrimaryColumn()
  xmlbamid: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  xwoba: number;
  @Column({ nullable: true })
  xba: number;
  @Column({ nullable: true })
  xslg: number;
  @Column({ nullable: true })
  xiso: number;
  @Column({ nullable: true })
  xobp: number;
  @Column({ nullable: true })
  brl: number;
  @Column({ nullable: true })
  brl_percent: number;
  @Column({ nullable: true })
  exit_velo: number;
  @Column({ nullable: true })
  max_ev: number;
  @Column({ nullable: true })
  hard_hit_percent: number;
  @Column({ nullable: true })
  k_percent: number;
  @Column({ nullable: true })
  bb_percent: number;
  @Column({ nullable: true })
  whiff_percent: number;
  @Column({ nullable: true })
  chase_percent: number;
  @Column({ nullable: true })
  arm_strength: number;
  @Column({ nullable: true })
  xera: number;
  @Column({ nullable: true })
  fb_velo: number;
  @Column({ nullable: true })
  fb_spin: number;
  @Column({ nullable: true })
  curve_spin: number;
}
