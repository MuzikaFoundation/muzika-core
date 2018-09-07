
export interface IpfsFile {
  file_id: number;
  parent_id?: number;
  file_type: string;
  ipfs_object_type?: string;
  ipfs_hash: string;
  encrypted: boolean;
  name?: string;
  created_at: string;
  status: 'untracked' | 'tracked' | 'disabled';
  aes_key?: string;
}

export interface MuzikaFilePath {
  path: string;
  previews: string[];
}
