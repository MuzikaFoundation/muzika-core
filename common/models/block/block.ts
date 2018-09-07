
import * as crypto from 'crypto';
import * as aesjs from 'aes-js';

export class BlockUtil {
  // define encryption info
  public static BLOCK_SIZE = 16;
  public static IV_SIZE = BlockUtil.BLOCK_SIZE;
  public static AES_KEY_SIZE = 32;
  public static GARBAGE_PADDING_SIZE = 256;

  public static RSA_KEY_BIT_SIZE = 2048;

  public static generateAESKey() {
    return crypto.randomBytes(BlockUtil.AES_KEY_SIZE);
  }

  public static generateIV() {
    return crypto.randomBytes(BlockUtil.IV_SIZE);
  }

  /**
   * Gets the encrypted block size from the length of plain Buffer or file.
   *
   * @param {number} length the plain buffer or file length.
   * @returns {number} Returns the encrypted block size.
   */
  public static getEncryptedSize(length: number) {
    // if encrypted, addtional padding and data will be added
    return length + BlockUtil.GARBAGE_PADDING_SIZE + BlockUtil.IV_SIZE + BlockUtil.BLOCK_SIZE - length % BlockUtil.BLOCK_SIZE;
  }
}

export class Block {
  private padded: boolean;
  private encrypted = false;

  data: Buffer;
  frontGarbageSize: number;
  aesKey: Buffer = null;      // AES key
  iv: Buffer = null;          // initializer vector
  blockHash: string;

  private constructor(data, padded = false) {
    // cannot construct the instance of this class directly.
    // Instead, use fromPlainData if the data is not encrypted,
    // or use fromEncryptedData if the data is encrypted.
    this.data = Buffer.from(data);
    this.padded = padded;

    if (this.padded) {
      // if padded, parse front garbage size from data
      this.frontGarbageSize = this.data[0];
    } else {
      this.frontGarbageSize = 0;
    }
  }

  static fromPlainData(data, padded = false) {
    return new Block(data, padded);
  }

  static fromEncryptedData(data, aesKey: Buffer = null) {
    // if the data length is not multiplied by block size, it may be wrong data.
    if (data.length % BlockUtil.IV_SIZE) {
      throw new Error('the data length is not multiplied by block size.');
    }

    const encryptedBlock = new Block(data);
    encryptedBlock.encrypted = true;
    encryptedBlock.aesKey = aesKey;
    encryptedBlock.iv = encryptedBlock.data.slice(0, BlockUtil.IV_SIZE);
    encryptedBlock.padded = true;
    return encryptedBlock;
  }

  encrypt(aesKey: Buffer = null, iv: Buffer = null) {
    // if already encrypted, don't need to encrypt
    if (this.encrypted) {
      return;
    }

    // generate AES Key and IV from parameter or random bytes if parameter is null
    this.aesKey = aesKey || BlockUtil.generateAESKey();
    this.iv = iv || BlockUtil.generateIV();

    // if not padded, set padding
    this.pad();

    const aesCbc = new aesjs.ModeOfOperation.cbc(this.aesKey, this.iv);
    const encryptedData = Buffer.from(aesCbc.encrypt(this.data));

    // build encrypted data
    this.data = Buffer.concat([this.iv, encryptedData]);

    // set encrypted to true
    this.encrypted = true;
  }

  decrypt(aesKey: Buffer = null) {
    // if not encrypted, don't need to decrypt
    if (!this.encrypted) {
      return;
    }

    // Gets AES Key from parameter or gets from instance variable if parameter is null
    this.aesKey = aesKey || this.aesKey;

    // initializer vector
    this.iv = this.data.slice(0, BlockUtil.IV_SIZE);

    const aesCbc = new aesjs.ModeOfOperation.cbc(this.aesKey, this.iv);

    // decrypt by AES key and IV
    this.data = aesCbc.decrypt(this.data.slice(BlockUtil.IV_SIZE));

    // the Block data encrypted must be padded
    this.padded = true;

    this.unpad();

    // set encrypted to false
    this.encrypted = false;
  }

  pad() {
    if (this.padded) {
      return;
    }

    // add padding
    const paddingValue = BlockUtil.BLOCK_SIZE - this.data.length % BlockUtil.BLOCK_SIZE;
    this.data = Buffer.concat([this.data, Buffer.alloc(paddingValue, paddingValue)]);

    // add garbage padding
    const frontGarbageSizeBuffer = crypto.randomBytes(1);
    this.frontGarbageSize = frontGarbageSizeBuffer[0];
    const frontGarbage = crypto.randomBytes(this.frontGarbageSize);
    const backGarbage = crypto.randomBytes(BlockUtil.GARBAGE_PADDING_SIZE - this.frontGarbageSize - 1);

    this.data = Buffer.concat([frontGarbageSizeBuffer, frontGarbage, this.data, backGarbage]);
    this.padded = true;
  }

  unpad() {
    if (!this.padded) {
      return;
    }

    this.frontGarbageSize = this.data[0];
    const backGarbageSize = BlockUtil.GARBAGE_PADDING_SIZE - this.frontGarbageSize - 1;

    this.data = this.data.slice(1 + this.frontGarbageSize, this.data.length - backGarbageSize);
    this.frontGarbageSize = 0;

    const dataPaddingSize = this.data[this.data.length - 1];
    this.data = this.data.slice(0, this.data.length - dataPaddingSize);
    this.padded = false;
  }

  isPadded() {
    return this.padded;
  }

  isEncrypted() {
    return this.encrypted;
  }
}
