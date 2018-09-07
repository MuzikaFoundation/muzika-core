import {User} from './user';

export interface PostComment {
  comment_id: number;
  post_id: number;
  parent_comment_id: number | null;
  author: User;
  content: string;
  likes: number;
  reply_cnt: number;
  reply_list: PostComment[];
  created_at: string;
  my_like?: boolean;
}
