import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

// @ArgsType()을 @InputType()로 수정
@InputType()
// id만 Omit(제외), entity가 ObjectType이므로 InputType으로 변환할 필요가 있다.
// OmitType은 InputType에만 작동
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ['id'] as const,
  InputType,
) {}
