import * as fs from "fs";
import * as rp from "request-promise";
import * as filenamify from "filenamify";
import { NationalGeographic, Photos } from "./types";

export class DailyPhotos {
  static async getDailyPhotos(): Promise<Photos[]> {
    const dailyDozen = await this.getDailyDozen();
    const photos = dailyDozen.photos.filter(p => p.height < p.width).map(p => {
        return {
          url:
            "http://yourshot.nationalgeographic.com" + p.photo_sizes["1920x0"],
          name: filenamify(p.title, { replacement: "-" })
        };
      });
    return photos;
  }

  static async getDailyDozen(): Promise<NationalGeographic.DailyDozen> {
    const options = {
      uri: "http://yourshot.nationalgeographic.com/rpc/daily-dozen/",
      json: true // Automatically parses the JSON string in the response
    };
    return rp(options);
  }

  static async downloadImages() {
    try {
      const photos = await this.getDailyPhotos();
      for (let i = 0; i < photos.length; i++) {
        rp(photos[i].url, { encoding: null }).then(
          img => {
            fs.writeFile(`${photos[i].name}.jpeg`, img, err => {
              if (err) {
                console.log(err.message);
              }
              console.log("The file has been saved!");
            });
          },
          error => console.error(error)
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
