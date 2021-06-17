import { getRepository } from 'typeorm';
import { Request } from 'express';
import { User } from '../entity/User';

export class UserController {
  private userRepository = getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async one(request: Request) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}
