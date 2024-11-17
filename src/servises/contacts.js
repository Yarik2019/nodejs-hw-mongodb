import { ContactsColection } from '../db/models/contact.js';

export const getAllContcats = async (req, res) => {
  const contacts = await ContactsColection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsColection.findById(contactId);
  return contact;
};

// MONGODB_URL=contacts.5yvgg.mongodb.net;
