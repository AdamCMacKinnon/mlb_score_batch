import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stuff_plus')
export class StuffPlusMetrics {
  @PrimaryGeneratedColumn('uuid')
  entry_id: string;
  @Column()
  date: string;
  @Column()
  fg_id: string;
  @Column()
  xmlbamid: string;
  @Column({ nullable: true })
  sp_s_ch: number;
  @Column({ nullable: true })
  sp_l_ch: number;
  @Column({ nullable: true })
  sp_s_ff: number;
  @Column({ nullable: true })
  sp_l_ff: number;
  @Column({ nullable: true })
  sp_s_SI: number;
  @Column({ nullable: true })
  sp_l_SI: number;
  @Column({ nullable: true })
  sp_s_SL: number;
  @Column({ nullable: true })
  sp_l_SL: number;
  @Column({ nullable: true })
  sp_s_KC: number;
  @Column({ nullable: true })
  sp_l_KC: number;
  @Column({ nullable: true })
  sp_s_FC: number;
  @Column({ nullable: true })
  sp_l_FC: number;
  @Column({ nullable: true })
  sp_s_FS: number;
  @Column({ nullable: true })
  sp_l_FS: number;
  @Column({ nullable: true })
  sp_s_FO: number;
  @Column({ nullable: true })
  sp_l_FO: number;
  @Column({ nullable: true })
  sp_stuff: number;
  @Column({ nullable: true })
  sp_location: number;
  @Column({ nullable: true })
  sp_pitching: number;
}
