import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { NotFoundError } from '../common/errorValidation/errors';

// import { streamUpload } from '../utils/mediaUpload';

export class UserController {
  private userRepository = getRepository(User);
  async all() {
    return this.userRepository.find();
  }

  async one(request: Request) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request) {
    try {
      // if uploading a file
      // const mediaUpload = await streamUpload(request);
      return this.userRepository.save(request.body);
    } catch (err) {
      throw err;
    }
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
        return 'record successfully deleted';
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      throw err;
    }
  }
}
