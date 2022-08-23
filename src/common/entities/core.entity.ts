import { Field, InterfaceType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@InterfaceType({ isAbstract: true })
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date, { description: 'Created At' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date, { description: 'Updated At' })
  updatedAt: Date;

  @BeforeInsert()
  updateDate() {
    this.updatedAt = new Date();
  }
}
