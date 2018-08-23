"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
const filenamify = require("filenamify");
class DailyPhotos {
    static async getDailyPhotos() {
        const dailyDozen = await this.getDailyDozen();
        const photos = dailyDozen &&
            dailyDozen.photos.filter(p => p.height < p.width).map(p => {
                return {
                    url: "http://yourshot.nationalgeographic.com" + p.photo_sizes["1920x0"],
                    name: filenamify(p.title, { replacement: "-" })
                };
            });
        return photos;
    }
    static async getDailyDozen() {
        const options = {
            uri: "http://yourshot.nationalgeographic.com/rpc/daily-dozen/",
            json: true // Automatically parses the JSON string in the response
        };
        try {
            const dailyDozen = await rp(options);
            return dailyDozen;
        }
        catch (error) {
            console.error(error.message);
        }
    }
    static async downloadImages() {
        try {
            const photos = await this.getDailyPhotos();
            if (!photos) {
                throw new Error("There are no photos");
            }
            for (let i = 0; i < photos.length; i++) {
                rp(photos[i].url, { encoding: null }).then(img => {
                    fs.writeFile(`${photos[i].name}.jpeg`, img, err => {
                        if (err) {
                            console.log(err.message);
                        }
                        console.log("The file has been saved!");
                    });
                }, error => console.error(error));
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }
}
exports.DailyPhotos = DailyPhotos;
