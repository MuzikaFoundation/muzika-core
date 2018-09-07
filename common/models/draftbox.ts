import {BasePost, MusicContract, MusicVideo} from './post';
import {MuzikaFilePath} from './file';
import {User} from './user';
import {PostComment} from './comment';

// tslint:disable-next-line
export interface BasePostDraft {
  // version?: string;
  // title?: string;
  // content?: string;
  // tags?: string[];

  draft_id?: number;
  version?: string;
  post_id?: number;
  title?: string;
  content?: string;
  views?: number;
  likes?: number;
  comments?: number;
  author?: User;
  tags?: string[];
  comment_list?: PostComment[];
  created_at?: string;
}

// tslint:disable-next-line
export interface CommunityPostDraft extends BasePostDraft {

}

export interface VideoPostDraft extends BasePostDraft {
  youtube_url?: string;
}

export interface MusicPostDraft extends BasePostDraft {
  type: 'sheet' | 'streaming';
  price?: number | string;

  files?: MuzikaFilePath[];
  cover_image_path?: string;
  music_video?: MusicVideo;
}
