import { getDailyPhotos } from './daily-photos';
import axios from 'axios';
import { NationalGeographic } from './types';

jest.mock('axios');

type mocPhotosResponse = { data: { photos: Partial<NationalGeographic.Photo>[] } };

describe('The getDailyPhotos function', () => {
  test('to return a photo', async () => {
    const photoTitle = 'someTitle';
    const response: mocPhotosResponse = {
      data: { photos: [{ height: 1080, width: 1920, photo_sizes: { '1920x0': '/someUrl' }, title: photoTitle }] }
    };
    (axios.get as jest.Mock).mockResolvedValue(response);
    const photos = await getDailyPhotos();
    expect(photos!.length).toBe(1);
    expect(photos![0].url).toBe('http://yourshot.nationalgeographic.com/someUrl');
    expect(photos![0].name).toBe('sometitle');
  });

  test('to log en error on rejection', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('rejection'));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    await getDailyPhotos();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
