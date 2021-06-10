import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  async index() {
    return await this.employeeService.index();
  }

  @Post('create')
  async create(@Body() employee: EmployeeEntity){
    return await this.employeeService.create(employee);
  }

  @Put('update')
  async update(@Body() body){
    return await this.employeeService.update(body);
  }
}
