"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var aesjs = require("aes-js");
var BlockUtil = /** @class */ (function () {
    function BlockUtil() {
    }
    BlockUtil.generateAESKey = function () {
        return crypto.randomBytes(BlockUtil.AES_KEY_SIZE);
    };
    BlockUtil.generateIV = function () {
        return crypto.randomBytes(BlockUtil.IV_SIZE);
    };
    /**
     * Gets the encrypted block size from the length of plain Buffer or file.
     *
     * @param {number} length the plain buffer or file length.
     * @returns {number} Returns the encrypted block size.
     */
    BlockUtil.getEncryptedSize = function (length) {
        // if encrypted, addtional padding and data will be added
        return length + BlockUtil.GARBAGE_PADDING_SIZE + BlockUtil.IV_SIZE + BlockUtil.BLOCK_SIZE - length % BlockUtil.BLOCK_SIZE;
    };
    // define encryption info
    BlockUtil.BLOCK_SIZE = 16;
    BlockUtil.IV_SIZE = BlockUtil.BLOCK_SIZE;
    BlockUtil.AES_KEY_SIZE = 32;
    BlockUtil.GARBAGE_PADDING_SIZE = 256;
    BlockUtil.RSA_KEY_BIT_SIZE = 2048;
    return BlockUtil;
}());
exports.BlockUtil = BlockUtil;
var Block = /** @class */ (function () {
    function Block(data, padded) {
        if (padded === void 0) { padded = false; }
        this.encrypted = false;
        this.aesKey = null; // AES key
        this.iv = null; // initializer vector
        // cannot construct the instance of this class directly.
        // Instead, use fromPlainData if the data is not encrypted,
        // or use fromEncryptedData if the data is encrypted.
        this.data = Buffer.from(data);
        this.padded = padded;
        if (this.padded) {
            // if padded, parse front garbage size from data
            this.frontGarbageSize = this.data[0];
        }
        else {
            this.frontGarbageSize = 0;
        }
    }
    Block.fromPlainData = function (data, padded) {
        if (padded === void 0) { padded = false; }
        return new Block(data, padded);
    };
    Block.fromEncryptedData = function (data, aesKey) {
        if (aesKey === void 0) { aesKey = null; }
        // if the data length is not multiplied by block size, it may be wrong data.
        if (data.length % BlockUtil.IV_SIZE) {
            throw new Error('the data length is not multiplied by block size.');
        }
        var encryptedBlock = new Block(data);
        encryptedBlock.encrypted = true;
        encryptedBlock.aesKey = aesKey;
        encryptedBlock.iv = encryptedBlock.data.slice(0, BlockUtil.IV_SIZE);
        encryptedBlock.padded = true;
        return encryptedBlock;
    };
    Block.prototype.encrypt = function (aesKey, iv) {
        if (aesKey === void 0) { aesKey = null; }
        if (iv === void 0) { iv = null; }
        // if already encrypted, don't need to encrypt
        if (this.encrypted) {
            return;
        }
        // generate AES Key and IV from parameter or random bytes if parameter is null
        this.aesKey = aesKey || BlockUtil.generateAESKey();
        this.iv = iv || BlockUtil.generateIV();
        // if not padded, set padding
        this.pad();
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.aesKey, this.iv);
        var encryptedData = Buffer.from(aesCbc.encrypt(this.data));
        // build encrypted data
        this.data = Buffer.concat([this.iv, encryptedData]);
        // set encrypted to true
        this.encrypted = true;
    };
    Block.prototype.decrypt = function (aesKey) {
        if (aesKey === void 0) { aesKey = null; }
        // if not encrypted, don't need to decrypt
        if (!this.encrypted) {
            return;
        }
        // Gets AES Key from parameter or gets from instance variable if parameter is null
        this.aesKey = aesKey || this.aesKey;
        // initializer vector
        this.iv = this.data.slice(0, BlockUtil.IV_SIZE);
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.aesKey, this.iv);
        // decrypt by AES key and IV
        this.data = aesCbc.decrypt(this.data.slice(BlockUtil.IV_SIZE));
        // the Block data encrypted must be padded
        this.padded = true;
        this.unpad();
        // set encrypted to false
        this.encrypted = false;
    };
    Block.prototype.pad = function () {
        if (this.padded) {
            return;
        }
        // add padding
        var paddingValue = BlockUtil.BLOCK_SIZE - this.data.length % BlockUtil.BLOCK_SIZE;
        this.data = Buffer.concat([this.data, Buffer.alloc(paddingValue, paddingValue)]);
        // add garbage padding
        var frontGarbageSizeBuffer = crypto.randomBytes(1);
        this.frontGarbageSize = frontGarbageSizeBuffer[0];
        var frontGarbage = crypto.randomBytes(this.frontGarbageSize);
        var backGarbage = crypto.randomBytes(BlockUtil.GARBAGE_PADDING_SIZE - this.frontGarbageSize - 1);
        this.data = Buffer.concat([frontGarbageSizeBuffer, frontGarbage, this.data, backGarbage]);
        this.padded = true;
    };
    Block.prototype.unpad = function () {
        if (!this.padded) {
            return;
        }
        this.frontGarbageSize = this.data[0];
        var backGarbageSize = BlockUtil.GARBAGE_PADDING_SIZE - this.frontGarbageSize - 1;
        this.data = this.data.slice(1 + this.frontGarbageSize, this.data.length - backGarbageSize);
        this.frontGarbageSize = 0;
        var dataPaddingSize = this.data[this.data.length - 1];
        this.data = this.data.slice(0, this.data.length - dataPaddingSize);
        this.padded = false;
    };
    Block.prototype.isPadded = function () {
        return this.padded;
    };
    Block.prototype.isEncrypted = function () {
        return this.encrypted;
    };
    return Block;
}());
exports.Block = Block;
//# sourceMappingURL=block.js.map