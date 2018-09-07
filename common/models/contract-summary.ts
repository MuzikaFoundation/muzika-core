

/**
 * MuzikaContractSummary has information for the IPFS files structure of a muzika contract. This is saved in the root directory in IPFS
 * object that the muzika contract points.
 */
export interface MuzikaContractSummary {
  version: string;                          // muzika contract files structure version. For legacy support.
  type: 'sheet' | 'music' | 'unknown';      // type of this contract file.
  title: string;                            // contract title.
  description: string;                      // contract description.
  author: string;                           // author name. (uploader name)
  authorAddress: string;                    // uploader's wallet address.

  coverImage: {
    [imagePath: string]: string;            // cover image path
  };

  files: {
    type: 'sheet' | 'video' | 'audio';      // file type.
    path: string;                           // IPFS file path.
    encrypted: boolean;                     // whether being encrypted.
    hasPreview: boolean;                    // whether the file has preview image or not.
    streamingSupportList: string[];         // streaming support list. If no streaming files, it is empty array.
  }[];                                      // files list for sell.

  videos: {
    type: 'ipfs' | 'youtube';               // video type that represents the video is in IPFS or youtube channel.
    path: string;                           // path or URL for the video.
  }[];                                      // video for contract description.
}
