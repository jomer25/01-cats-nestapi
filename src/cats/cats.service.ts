import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      id: 1,
      age: 2,
      breed: 'Bombay',
      name: 'Pixel',
    },
  ];

  create(createCatDto: CreateCatDto): Cat {
    const newCat = {
      id: this.cats.length + 1,
      ...createCatDto,
    }
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if(cat) {
      return cat;
    }
    throw new NotFoundException();
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if(cat) {
      cat.name = updateCatDto.name;
      cat.age = updateCatDto.age;
      cat.breed = updateCatDto.breed;
      return cat;
    }
    throw new NotFoundException();
  }

  remove(id: number) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if(index !== -1) {
      return this.cats.splice(index, 1);
    }
    throw new NotFoundException();
  }
}