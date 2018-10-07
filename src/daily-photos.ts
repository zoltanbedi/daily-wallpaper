import * as Fs from 'fs';
import * as path from 'path';
import { NationalGeographic, Image } from './types';
import slugify from 'slugify';
import axios from 'axios';

const yourShotUrl = 'http://yourshot.nationalgeographic.com';
export async function getDailyPhotos(): Promise<Image[] | undefined> {
  try {
    const response = await axios.get(`${yourShotUrl}/rpc/daily-dozen/`);
    const dailyDozen = response.data as NationalGeographic.DailyDozen;
    const photos = dailyDozen.photos.filter(p => p.height < p.width).map(p => {
      return {
        url: yourShotUrl + p.photo_sizes['1920x0'],
        name: slugify(p.title)
      };
    });
    return photos;
  } catch (error) {
    console.error(error);
  }
}

export async function downloadImages() {
  const photos = await getDailyPhotos();
  const promises = [];
  if (!photos) {
    return console.error('There was an error getting the images');
  }
  for (let i = 0; i < photos.length; i++) {
    promises.push(saveImages(photos[i]));
  }
  await Promise.all(promises);
  console.log('The photos are downloaded.');
}

export async function saveImages(image: Image) {
  // path to save should come from input
  const pathToSave = path.resolve(__dirname, `${image.name}.jpeg`);

  const response = await axios.get(image.url, { responseType: 'stream' });
  response.data.pipe(Fs.createWriteStream(pathToSave));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log(`${pathToSave} successfully saved.`);
      resolve();
    });

    response.data.on('error', () => {
      reject();
    });
  });
}
