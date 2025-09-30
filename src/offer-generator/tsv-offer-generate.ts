import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.js';
import {MockServerData} from '../types/mockServerData.type';
import {generateRandomValue, getRandomItem, getRandomItems} from '../helpers/common.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_RATING = 10;
const MAX_RATING = 50;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const ind = generateRandomValue(0, 5);
    const city = this.mockData.city[ind] as string;
    const previewPhoto = getRandomItem<string>(this.mockData.previewPhoto);
    const photoLiving = getRandomItems<string>(this.mockData.photoLiving).join(';');
    const flagPremium = generateRandomValue(0, 50) < 25;
    const flagFavourite = generateRandomValue(0, 50) < 25;
    const rating = generateRandomValue(MIN_RATING, MAX_RATING) / 10;
    const typeLiving = getRandomItem<string>(['apartment', 'house', 'room', 'hotel']);
    const countRooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const countGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const comforts = getRandomItems<string>(this.mockData.comforts).join(';');
    const author = getRandomItem<string>(this.mockData.author);
    const countComments = generateRandomValue(0, 50);
    const latitude = this.mockData.latitude[ind];
    const longitude = this.mockData.longitude[ind];
    return [
      title, description, date, city, previewPhoto, photoLiving, flagPremium,
      flagFavourite, rating, typeLiving, countRooms, countGuests, price, comforts,
      author, countComments, latitude, longitude,
    ].join('\t');
  }
}
