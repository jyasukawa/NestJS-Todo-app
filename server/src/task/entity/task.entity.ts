import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task')  // データベースの `task` テーブルを参照
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    task: string;
}
