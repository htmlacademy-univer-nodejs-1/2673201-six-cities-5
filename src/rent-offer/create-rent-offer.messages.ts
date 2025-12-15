export const CreateRentOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  city: {
    invalidFormat: 'city must be a valid value',
  },
  previewPhoto: {
    invalidFormat: 'previewPhoto must be a string',
    maxLength: 'Maximum length for previewPhoto is 256',
  },
  photoLiving: {
    invalidFormat: 'photoLiving must be an array',
    itemInvalidFormat: 'Each photoLiving item must be a string',
    itemMaxLength: 'Maximum length for each photo is 256',
  },
  flagPremium: {
    invalidFormat: 'flagPremium must be a boolean',
  },
  flagFavourite: {
    invalidFormat: 'flagFavourite must be a boolean',
  },
  typeLiving: {
    invalidFormat: 'typeLiving must be a valid value',
  },
  countRooms: {
    invalidFormat: 'countRooms must be an integer',
    minValue: 'Minimum countRooms is 1',
    maxValue: 'Maximum countRooms is 8',
  },
  countGuests: {
    invalidFormat: 'countGuests must be an integer',
    minValue: 'Minimum countGuests is 1',
    maxValue: 'Maximum countGuests is 10',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  comforts: {
    invalidFormat: 'comforts must be an array',
    itemInvalidFormat: 'Each comfort must be a valid value',
  },
  author: {
    invalidId: 'author must be a valid MongoId',
  },
  latitude: {
    invalidFormat: 'latitude must be a number',
    minValue: 'Minimum latitude is -90',
    maxValue: 'Maximum latitude is 90',
  },
  longitude: {
    invalidFormat: 'longitude must be a number',
    minValue: 'Minimum longitude is -180',
    maxValue: 'Maximum longitude is 180',
  },
} as const;
