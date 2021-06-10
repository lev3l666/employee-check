import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity('employee')
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false, name: 'id_employee' })
  employeeId: string;

  @Column({ type: 'varchar', nullable: false, name: 'lastname_1' })
  lastName1: string;

  @Column({ type: 'varchar', nullable: false, name: 'lastname_2' })
  lastName2: string;

  @Column({ type: 'varchar', nullable: false, name: 'name_1' })
  name1: string;

  @Column({ type: 'varchar', nullable: true, name: 'name_2' })
  name2: string;

  @Column({ type: 'varchar', nullable: false, name: 'country' })
  country: string;

  @Column({ type: 'varchar', nullable: false, name: 'id_type' })
  idType: string;

  @Column({ type: 'varchar', nullable: false, name: 'mail' })
  mail: string;

  @Column({ type: 'varchar', nullable: false, name: 'area' })
  area: string;

  @Column({ type: 'int', nullable: false, name: 'status' })
  status: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'admission_at' })
  admission: Date;
}