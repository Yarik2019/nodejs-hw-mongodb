import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import dotenv from 'dotenv';

import { getAllContcats, getContactById } from './servises/contacts.js';
// import { env } from './utils/env.js';
const PORT = process.env.PORT || 3000;

// async function ft() {
//   const res = await getContactById('673a471ccfb47cb358741ee6');
//   console.log(res);
// }
// ft();
export const setupServer = () => {
  const app = express();

  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty' },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContcats();
    console.log(contacts);
    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).send({ message: 'Contact not found' });
    }

    res.send({
      status: 200,
      message: `Successfully found contact with id: ${contactId}`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).send({ status: 404, message: 'Route not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
dotenv.config();
