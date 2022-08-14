import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    // const newRestaurant = new Restaurant();
    // newRestaurant.name = createRestaurantDto.name;
    // ...
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    // update는 db에 해당 row가 존재하는지 여부를 판단하지 않고 실행
    // 따라서 없는 id를 udpate해도 에러가 발생하지 않음
    return this.restaurants.update(id, { ...data });
  }
}
