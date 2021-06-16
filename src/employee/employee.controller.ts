import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { EmployeeDto, UpdateEmpDto } from '../dto-interface/dto/EmployeeDto';
import { EmployeeInterface } from '../dto-interface/interface/employee.interface';
import { ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  @Get('/')
  async index(): Promise<EmployeeInterface> {
    return await this.employeeService.index();
  }

  @Get('countries')
  async getCountries() {
    return await this.employeeService.getCountries();
  }

  @Get('areas')
  async getAreas() {
    return await this.employeeService.getAreas();
  }

  @Get('idTypes')
  async getIdTypes() {
    return await this.employeeService.getIdTypes();
  }

  @Post('create')
  async create(@Body() employee: EmployeeDto): Promise<EmployeeInterface> {
    return await this.employeeService.create(employee);
  }

  @Put('update')
  async update(@Body() body): Promise<EmployeeInterface>{
    const dbCompare = {};
    const parsedEmployee = new UpdateEmpDto();
    // make relations to get givenDatabaseName based on entity name
    this.employeeEntity.metadata.ownColumns.forEach((element) => {
      dbCompare[element.propertyName] = element.givenDatabaseName;
    });
    //create the proper object based on dynamic data
    parsedEmployee.id = body.id;
    parsedEmployee[dbCompare[body.field]] = body.value;
    parsedEmployee[body.field] = body.value;
    // make the request
    return await this.employeeService.update(parsedEmployee);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  @Delete('delete/:id')
  async deleteEmployee(@Param() id): Promise<EmployeeInterface> {
    return await this.employeeService.deleteEmployee(id);
  }
}
