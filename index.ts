import { downloadImages } from './src/daily-photos';
import * as meow from 'meow';

const cli = meow(`
    Usage
      $ daily-wallpaper <path>
`);

downloadImages(cli.input[0]);
