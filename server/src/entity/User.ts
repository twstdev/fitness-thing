import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BaseEntity } from "typeorm";
import Joi, { ValidationResult } from '@hapi/joi';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  static schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .max(32)
        .required(),
    confirmedPassword: Joi.ref('password'),
    age: Joi.number()
        .integer()
        .min(16)
        .max(100)
        .required(),
    name: Joi.string()
        .min(3)
        .max(64)
  })
      .with('password', 'confirmedPassword');

  static validateSchema = (
      user: Partial<User> & {
        confirmedPassword: string
      }
  ): ValidationResult => {
    return User.schema.validate(user);
  }

  hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, await bcrypt.genSalt(10));
  }

  comparePassword = async (password: string): Promise<boolean> => {
    return bcrypt.compare(password, this.password);
  }
}
