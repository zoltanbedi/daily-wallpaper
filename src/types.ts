export interface Photos {
  url: string;
  name: string;
}

export namespace NationalGeographic {

  export interface PhotoSizes {
    '720x0': string;
    '1080x1080': string;
    '720x720': string;
    '960x960': string;
    '1136x0': string;
    '480x0': string;
    '150x150': string;
    '1136x1136': string;
    '1080x0': string;
    '480x480': string;
    '1920x1920': string;
    '960x0': string;
    '96x96': string;
    '180x180': string;
    '640x640': string;
    '240x240': string;
    '320x0': string;
    '1920x0': string;
    '320x320': string;
    '640x0': string;
  }

  export interface Owner {
    country: string;
    avatar_url: string;
    display_name: string;
    profile_url: string;
    user_id: number;
  }

  export interface Photo {
    votes: number;
    has_favorite: boolean;
    title: string;
    url: string;
    photo_sizes: PhotoSizes;
    hashtags: string[];
    has_editor_notes: number;
    height: number;
    award_count: number;
    caption: string;
    comment_count: number;
    dailydozen_url: string;
    width: number;
    owner: Owner;
    id: number;
    favorite_count: number;
  }

  export interface DailyDozen {
    photos: Photo[];
    previous_date: string;
    obj: string;
    next_date?: any;
    date: string;
    can_vote: boolean;
    can_see_voting: boolean;
  }

}
