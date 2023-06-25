import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(
    @Body() 
    createCatDto: CreateCatDto
  ) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() 
    updateCatDto: UpdateCatDto
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe())
    id: number
  ) {
    return this.catsService.remove(id);
  }
}