import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces';

abstract class MongoModel<T> implements Model<T> {
  constructor(
    readonly model: M<T & Document>,
  ) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find({}, {}, { lean: true });

  update = async (_id: number, obj: T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id }, { obj });
}

export default MongoModel;
