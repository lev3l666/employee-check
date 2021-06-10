import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  async index() {
    const employees = await this.employeeEntity.find();
    console.log('Employees:', employees);
    return {
      statusCode: 200,
      error: null,
      message: employees,
    };
  }

  async create(employee: EmployeeEntity) {
    const response = await this.employeeEntity.save(employee);
    console.log('employee:', employee);
    return {
      statusCode: 200,
      error: null,
      message: response,
    };
  }

  async update(body) {
    const response = await this.employeeEntity.update(
      { id: body.id },
      { employeeId: body.employeeId },
    );
    console.log('Body:', body);
    return {
      statusCode: 200,
      error: null,
      message: response,
    };
  }
}
