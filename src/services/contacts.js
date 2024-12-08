import { ContactsColection } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/constants.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContcats = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  user,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsColection.find({ userId: user._id });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsColection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { data: contacts, ...paginationData };
};

export const getContactById = (contactId, user) =>
  ContactsColection.findById({ _id: contactId, userId: user._id });

export const postContact = (contactData) =>
  ContactsColection.create(contactData);

export const patchContact = (contactId, user, contactData) =>
  ContactsColection.findByIdAndUpdate(
    { _id: contactId, userId: user._id },
    contactData,
    { new: true },
  );

export const deleteContact = (contactId, user) =>
  ContactsColection.findByIdAndDelete({ _id: contactId, userId: user._id });
