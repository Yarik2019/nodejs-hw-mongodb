import mongoose from 'mongoose';
// import { env } from '../utils/.env';
const DB_URI =
  'mongodb+srv://ciba873:RXY9w47Lu8rFJqZb@contacts.5yvgg.mongodb.net/?retryWrites=true&w=majority';

export const initMongoConnection = async () => {
  try {
    // const user = env('MONGODB_USER');
    // const pwd = env('MONGODB_PASSWORD');
    // const url = env('MONGODB_URL');
    // const db = env('MONGODB_DB');

    // console.log(user);

    // await mongoose.connect(
    //   `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=contacts`,
    // );
    await mongoose.connect(DB_URI);
    // mongodb+srv://ciba873:<db_password>@contacts.5yvgg.mongodb.net/

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
};
