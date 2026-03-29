import { Entity, PrimaryColumn } from 'typeorm';

@Entity('pitch_logs')
export class PitchLogs {
  @PrimaryColumn()
  event_id: string;
}
