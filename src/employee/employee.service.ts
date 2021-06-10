import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDto } from 'src/dto-interface/dto/EmployeeDto';
import { EmployeeInterface } from 'src/dto-interface/interface/employee.interface';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { availableCountries } from '../helpers/countries';
import { availableAreas } from '../helpers/areas';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  async index() {
    const employees = await this.employeeEntity.find({ where: { status: 1 } });
    console.log('Employees:', employees);
    return {
      statusCode: 200,
      error: null,
      message: employees,
    };
  }

  async find(id: number) {
    const user = await this.employeeEntity.findOne({
      where: { id, status: 1 },
    });
    console.log('User:', user);
    return {
      statusCode: 200,
      error: null,
      message: user,
    };
  }

  async create(employee: EmployeeDto): Promise<EmployeeInterface> {
    employee.mail = await this.mailChecker(employee);
    const response = await this.employeeEntity.save(employee);
    console.log('employee:', employee, 'ex');
    return {
      statusCode: 200,
      error: null,
      message: response,
    };
  }

  async update(body): Promise<EmployeeInterface> {
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

  async getAreas() {
    return availableAreas;
  }

  async getCountries() {
    return availableCountries;
  }

  async mailFinder(mail: string) {
    // find if email already exists
    const existingMail = await this.employeeEntity.findOne({
      where: { mail: mail },
    });
    if (existingMail === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async mailChecker(employee) {
    // counter for id
    let i = 1;
    // workaround to avoid overwriting
    const temp = JSON.parse(JSON.stringify(employee));
    // remove white spaces (complex lastnames)
    if (/\s/.test(temp.lastName1)) {
      temp.lastName1 = temp.lastName1.replace(/\s/g, '');
    }
    // Contruction of default email format
    temp.mail = `${temp.name1.toLowerCase()}.${temp.lastName1.toLowerCase()}.${
      temp.employeeId
    }@cidenet.com.${temp.country}`;
    // add +1 while mail exists
    while (await this.mailFinder(temp.mail)) {
      temp.mail = `${temp.name1.toLowerCase()}.${temp.lastName1.toLowerCase()}.${
        temp.employeeId
      }.${i}@cidenet.com.${temp.country}`;
      i++;
    }
    return temp.mail;
  }
}
