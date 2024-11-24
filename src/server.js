import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';

import ContactsRouter from './routers/contacts.js';
// import {
//   deleteContact,
//   getAllContcats,
//   getContactById,
//   patchContact,
//   postContact,
// } from './services/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty' },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));

  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContcats();

  //   res.send({
  //     status: 200,
  //     message: 'Successfully found contacts!',
  //     data: contacts,
  //   });
  // });

  // app.get('/contacts/:contactId', async (req, res, next) => {
  //   const { contactId } = req.params;

  //   const contact = await getContactById(contactId);

  //   if (!contact) {
  //     return res
  //       .status(404)
  //       .send({ status: 404, message: 'Contact not found' });
  //   }

  //   res.send({
  //     status: 200,
  //     message: `Successfully found contact with id: ${contactId}`,
  //     data: contact,
  //   });
  // });
  // app.post('/contacts', async (req, res) => {
  //   const contacts = await postContact(req.body);

  //   res.send({
  //     status: 200,
  //     message: 'Successfully created contacts!',
  //     data: contacts,
  //   });
  // });

  // app.delete('/contacts/:contactId', async (req, res, next) => {
  //   const { contactId } = req.params;

  //   const contact = await deleteContact(contactId);

  //   if (!contact) {
  //     return res
  //       .status(404)
  //       .send({ status: 404, message: 'Contact not found' });
  //   }

  //   res.sendStatus(204);
  // });

  // app.patch('/contacts/:contactId', async (req, res, next) => {
  //   const { contactId } = req.params;

  //   const contact = await patchContact(contactId, req.body);

  //   if (!contact) {
  //     return res
  //       .status(404)
  //       .send({ status: 404, message: 'Contact not found' });
  //   }

  //   res.send({
  //     status: 200,
  //     message: 'Successfully patched a contact!',
  //     data: contact,
  //   });
  // });

  app.use(ContactsRouter);
  // app.use(ContactsRouter);
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
