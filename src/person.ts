import * as rp from 'request-promise';
import * as fs from 'fs';
import paramCase = require('param-case');
import { Options } from 'request-promise';
export class Person {

  constructor() {
  }

  getDailyPhotos() {
    const options: Options = {
      uri: 'http://yourshot.nationalgeographic.com/rpc/daily-dozen/',
      json: true // Automatically parses the JSON string in the response
    };
    const baseUrl = 'http://yourshot.nationalgeographic.com';

    return rp(options)
      .then((response: NationalGeographic.DailyDozen) => {
        const photos = response.photos.filter(p => p.height < p.width).map(p => {
          return {
            url: baseUrl + p.photo_sizes["1920x0"],
            fileName: paramCase(p.title)
          }
        });
        return photos;
      });
  }

  downloadImages() {
    this.getDailyPhotos().then(urls => {
      for (let i = 0; i < urls.length; i++) {
        rp(urls[i].url, { encoding: null }).then(img => {
          fs.writeFile(`${urls[i].fileName}.jpeg`, img, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
        })
      }
    })
  }

}
