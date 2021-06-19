import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { userInterface } from '../interface/User';

export enum gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: gender,
    nullable: true,
  })
  gender: gender;

  public static mockTestBoard(): userInterface {
    const user: User = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 20;
    return user;
  }
}
