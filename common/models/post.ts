import {PostComment} from './comment';
import {User} from './user';
import {IpfsFile, MuzikaFilePath} from './file';
import {BasePostDraft, CommunityPostDraft, MusicPostDraft, VideoPostDraft} from './draftbox';

export class BoardType {
  static MUSIC = 'music';
  static VIDEO = 'video';
  static COMMUNITY = 'community';
}

export interface MusicVideo {
  type: 'ipfs' | 'youtube';
  path: string;
}

export interface BasePost extends BasePostDraft {
  version?: string;
  post_id: number;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  author: User;
  tags: string[];
  comment_list: PostComment[];
  created_at: string;
}

// tslint:disable-next-line
export interface CommunityPost extends BasePost {

}

export interface VideoPost extends BasePost {
  video_thumb?: string;
  youtube_url: string;
}

export interface MusicPost extends BasePost {
  type: 'sheet' | 'streaming';
  price?: number | string;

  ipfs_file?: IpfsFile;
  music_contract?: MusicContract;

  files?: MuzikaFilePath[];
  cover_image_path?: string;
  music_video?: MusicVideo;
}

export interface MusicContract {
  contract_id: number;
  ipfs_file_id?: number;
  ipfs_file_hash?: string;
  aes_key?: string;
  tx_hash: string;
  contract_address?: string;
  original_hash?: string;
}
