import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDto, UpdateEmpDto } from 'src/dto-interface/dto/EmployeeDto';
import { EmployeeInterface } from 'src/dto-interface/interface/employee.interface';
import { Repository, getConnection } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { availableCountries } from '../helpers/countries';
import { availableAreas } from '../helpers/areas';
import { availableTypes } from '../helpers/idTypes';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  async index() {
    const employees = await this.employeeEntity.find({ where: { status: 1 } });
    return {
      statusCode: 200,
      error: null,
      message: employees,
    };
  }

  async findEmployee(id: number) {
    const user = await this.employeeEntity.findOne({
      where: { id, status: 1 },
    });
    return {
      statusCode: 200,
      error: null,
      message: user,
    };
  }

  async create(employee: EmployeeDto): Promise<EmployeeInterface> {
    employee.mail = await this.mailChecker(employee);
    if (await this.findDupId(employee.employeeId, employee.idType)) {
      return {
        statusCode: 400,
        error: 'ID already registered',
        message: 'Bad Request',
      };
    } else {
      const response = await this.employeeEntity.save(employee);
      return {
        statusCode: 200,
        error: null,
        message: response,
      };
    }
  }

  async checkRegeneration(name, id ) {
    const employee = await this.employeeEntity.findOne({ id: id });
    let response;
    if (name.includes('1')) {
      console.log('Regeneration of email in progress...', employee);
      employee.mail = await this.mailChecker(employee);
      response = await this.employeeEntity.save(employee);
    }
  }

  async deleteEmployee(id): Promise<EmployeeInterface> {
    this.employeeEntity.update({ id: id }, { status: 0 });
    return {
      statusCode: 200,
      error: null,
      message: 'Sucess',
    };
  }

  async update(body: UpdateEmpDto): Promise<EmployeeInterface> {
    // temporary clean id
    const tempId = body.id;
    body.id = null;
    await validate(body, {skipMissingProperties: true}).then((errors) => {
      if (errors.length > 0) {
        let msg = Object.values(errors[0].constraints);
        throw new BadRequestException(msg);
      }
    });
    const givenDBName = Object.keys(body)[1];
    const value = body[givenDBName];
    // console.log('body:', body, '\ngivenDBName:', givenDBName, '\nValue:', value);
    // making query string
    const queryReq = `UPDATE employee SET ${givenDBName} = "${value}" WHERE id = ${tempId}`;
    // exec query
    const response = await getConnection().query(queryReq);
    this.checkRegeneration(givenDBName, tempId);
    return {
      statusCode: 200,
      error: null,
      message: 'Sucess',
    };
  }

  async getAreas() {
    return availableAreas;
  }

  async getCountries() {
    return availableCountries;
  }

  async getIdTypes() {
    return availableTypes;
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

  async findDupId(employeeId: string, idType: string) {
    // console.log('employeeId ', employeeId, 'idType', idType);
    const existingEmployee = await this.employeeEntity.findOne({
      where: { employeeId: employeeId, idType: idType },
    });
    if (existingEmployee === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
