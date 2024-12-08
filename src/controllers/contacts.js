import createHttpError from 'http-errors';
import {
  deleteContact,
  getAllContcats,
  getContactById,
  patchContact,
  postContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const user = req;

  const contacts = await getAllContcats({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    user,
  });

  if (!contacts) throw createHttpError(404, 'Contacts not found');

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const { user } = req;

  const contact = await getContactById(contactId, user);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id: ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is missing');
  }

  const { user } = req;

  const contact = await postContact({ ...req.body, userId: user._id });

  if (!contact) throw createHttpError(404, 'Filed to create contact');

  res.status(201).send({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await deleteContact(contactId, user);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.sendStatus(204);
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await patchContact(contactId, user, req.body);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
