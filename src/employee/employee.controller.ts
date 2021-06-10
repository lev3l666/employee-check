import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { EmployeeDto } from '../dto-interface/dto/EmployeeDto';
import { EmployeeInterface } from '../dto-interface/interface/employee.interface';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

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

  @Post('create')
  async create(@Body() employee: EmployeeDto): Promise<EmployeeInterface> {
    return await this.employeeService.create(employee);
  }

  @Put('update')
  async update(@Body() employee: EmployeeDto): Promise<EmployeeInterface>{
    return await this.employeeService.update(employee);
  }
}
