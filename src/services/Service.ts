import { ZodError } from 'zod';
import { MongoModel } from '../models';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(
    protected model: MongoModel<T>,
  ) { }

  public read = async (): Promise<T | T[] | ServiceError> => this.model.read();

  public create = async (obj: T): Promise<T> => this.model.create(obj);

  public update = async (_id: number, obj: T): Promise<T | null> => {
    const result = await this.model.update(_id, obj);

    return result;
  };
}

export default Service;
