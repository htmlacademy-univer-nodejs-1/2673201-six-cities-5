export const CreateCommentValidationMessage = {
  text: {
    minLength: 'Comment text must be at least 5 characters.',
    maxLength: 'Comment text must be no longer than 1024 characters.'
  },
  rating: {
    invalidFormat: 'Rating must be an integer.',
    minValue: 'Rating must be at least 1.',
    maxValue: 'Rating must be at most 5.'
  },
  offerId: {
    invalidId: 'OfferId must be a valid MongoId.'
  },
  userId: {
    invalidId: 'UserId must be a valid MongoId.'
  }
} as const;
