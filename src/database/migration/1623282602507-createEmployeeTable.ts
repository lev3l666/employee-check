// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class createEmployeeTable1623282602507 implements MigrationInterface {
//      //dabatase name: employee_checkin

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query("CREATE TABLE 'employee' ('id' int(11) NOT NULL,'id_employee' varchar(20) NOT NULL,'lastname_1' varchar(20) NOT NULL,'lastname_2' varchar(20) NOT NULL,'name_1' varchar(20) NOT NULL,'name_2' varchar(50) DEFAULT NULL,'country' text NOT NULL,'id_type' varchar(50) NOT NULL,'mail' text NOT NULL,'area' text NOT NULL,'status' int(11) NOT NULL DEFAULT 1,'created_at' date NOT NULL DEFAULT current_timestamp(),'admission_at' date NOT NULL)");
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       'ALTER TABLE `employee` ADD PRIMARY KEY (`id`); ALTER TABLE `employee` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; COMMIT;',
//     );
//     }

// }
