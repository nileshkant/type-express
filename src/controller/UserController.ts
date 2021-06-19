import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
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

  // using query builder <createQueryBuilder>
  async remove(request: Request, response: Response) {
    try {
      const data = await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id: request.params.id })
        .execute();
      if (data.affected === 1) {
        response.status(204);
        response.send('record successfully deleted');
      } else {
        response.status(404);
        response.send('record not found');
      }
    } catch (err) {
      console.log(err);
    }
  }
}
