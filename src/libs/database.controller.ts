import mongoose from 'mongoose';
import { Color } from './server.types';
import { database } from './app.json';

export class DatabaseController {
  /**
   * This class handles all the database connections!
   */

  private databaseURL = database.offline;
  private database: mongoose.Connection;

  constructor() {
    mongoose.connect(this.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.database = mongoose.connection;
    this.dbError();
  }

  private dbError(): void {
    this.database.on('open', () => {
      if (this.databaseURL.search('localhost') > 0)
        console.log(
          Color.custom.green('Successfully connected to MongoDB at ') +
            this.databaseURL
        );
      else
        console.log(
          Color.custom.green('Successfully connected to MongoDB at ') +
            this.databaseURL.split('@')[1].split('/')[0]
        );
    });
    this.database.on(
      'error',
      console.error.bind(console, 'MongoDB connection error:')
    );
  }

  private errorHandler(message: string, err: any): void {
    /**
     * @param message is string of details about errors
     * @param err callback error
     */
    console.log(`${message}\n${err}`);
  }

  create(model: mongoose.Model<mongoose.Document, {}>, data: object) {
    /**
     * @param model is mongoose schema model
     * @param data
     * @return
     */
    return model.create(data);
  }

  /**
   * @error if there are any error then change the version and
   *  below code as heaplinker.io
   */
  updateOne(
    model: mongoose.Model<mongoose.Document, {}>,
    filter: object,
    updateOn: object,
    upsert = true
  ): mongoose.Query<any, mongoose.Document> {
    /**
         * @param model is mongoose schema model
         * @param filter
         * @param updateOn where to update, takes mongodb query
         * @param upsert is optional default value true
         * @return { n: 1|0, nModified: 0, ok: 1|0 } as Promise

         */
    return model.updateOne(filter, updateOn, { upsert: upsert });
  }

  read<T>(
    model: mongoose.Model<mongoose.Document, {}>,
    filter = {},
    includeOrExclude?: T
  ): mongoose.Query<any, mongoose.Document> {
    /**
     * @param model is mongoose schema model
     * @param filter, default is {}
     * @return Promise of all the filtered schema model data
     */
    if (includeOrExclude) return model.find(filter, includeOrExclude);
    return model.find(filter);
  }
}
