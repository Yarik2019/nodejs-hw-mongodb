import mongoose from 'mongoose';
// import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    // const user = env('MONGODB_USER');
    // const pwd = env('MONGODB_PASSWORD');
    // const url = env('MONGODB_URL');
    // const db = env('MONGODB_DB');

    // await mongoose.connect(
    //   `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    // );
    const user = 'ciba873';
    const pwd = 'RXY9w47Lu8rFJqZb';
    const url = 'contacts.5yvgg.mongodb.net';
    const db = 'contacts';
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
};
