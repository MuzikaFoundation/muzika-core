import { Block, MuzikaConsole } from '@muzika/core';
import * as Hls from 'hls.js';

export class MuzikaHLSLoader extends Hls.DefaultConfig.loader {
  fileName: string;
  ipfsHash: any;
  cipherKey: Buffer;
  stats: any;

  private context: any;
  private config: any;
  private callbacks: any;
  private retryDelay: any;
  private retryTimeout: any;
  private requestTimeout: any;
  private xhrSetup: any;
  private loader: any;

  constructor(config) {
    super(config);
    this.ipfsHash = config.ipfsHash;
    this.fileName = config.fileName;
    this.cipherKey = config.cipherKey || null;
  }

  destroy() {
    super.destroy();
  }

  abort() {
    super.abort();
  }

  load(context, config, callbacks) {
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.stats = { trequest: performance.now(), retry: 0 };
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  }

  loadInternal() {
    const context = this.context;
    const urlParts = context.url.split('/');
    const streamFilename = urlParts[urlParts.length - 1];
    const nameAppend = (this.cipherKey) ? '.encrypted' : '';

    context.url = `https://ipfs.io/ipfs/${this.ipfsHash}/streaming/${this.fileName}/${streamFilename}${nameAppend}`;

    let xhr;
    xhr = this.loader = new XMLHttpRequest();

    const stats = this.stats;
    stats.tfirst = 0;
    stats.loaded = 0;
    const xhrSetup = this.xhrSetup;

    try {
      if (xhrSetup) {
        try {
          xhrSetup(xhr, context.url);
        } catch (e) {
          // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test");}
          // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
          xhr.open('GET', context.url, true);
          xhrSetup(xhr, context.url);
        }
      }
      if (!xhr.readyState) {
        xhr.open('GET', context.url, true);
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      this.callbacks.onError({ code: xhr.status, text: e.message }, context, xhr);
      return;
    }

    xhr.onreadystatechange = this.readystatechange.bind(this);
    xhr.onprogress = this.loadprogress.bind(this);
    xhr.responseType = 'arraybuffer';

    // setup timeout before we perform request
    this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout);
    xhr.send(null);
  }


  readystatechange(event) {
    const xhr = event.currentTarget,
      readyState = xhr.readyState,
      stats = this.stats,
      context = this.context,
      config = this.config;

    // don't proceed if xhr has been aborted
    if (stats.aborted) {
      return;
    }

    // >= HEADERS_RECEIVED
    if (readyState >= 2) {
      // clear xhr timeout and rearm it if readyState less than 4
      window.clearTimeout(this.requestTimeout);
      if (stats.tfirst === 0) {
        stats.tfirst = Math.max(performance.now(), stats.trequest);
      }

      if (readyState === 4) {
        const status = xhr.status;
        // http status between 200 to 299 are all successful
        if (status >= 200 && status < 300) {
          stats.tload = Math.max(stats.tfirst, performance.now());

          let data, len;
          if (this.cipherKey) {
            const encryptedBlock = Block.fromEncryptedData(xhr.response, this.cipherKey);
            encryptedBlock.decrypt();
            data = encryptedBlock.data;
            len = data.length;
          } else {
            data = xhr.response;
            len = data.length;
          }
          if (context.responseType !== 'arraybuffer') {
            data = buf2str(data);
            len = data.length;
          }
          stats.loaded = stats.total = len;
          const response = { url: this.context.url, data: data };
          MuzikaConsole.log(xhr, response, context, this);
          this.callbacks.onSuccess(response, stats, context, xhr);
        } else {
          // if max nb of retries reached or if http status between 400 and 499
          // (such error cannot be recovered, retrying is useless), return error
          if (stats.retry >= config.maxRetry || (status >= 400 && status < 499)) {
            MuzikaConsole.error(`${status} while loading ${context.url}`);
            this.callbacks.onError({ code: status, text: xhr.statusText }, context, xhr);
          } else {
            // retry
            MuzikaConsole.warn(`${status} while loading ${context.url}, retrying in ${this.retryDelay}...`);
            // aborts and resets internal state
            this.destroy();
            // schedule retry
            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay);
            // set exponential backoff
            this.retryDelay = Math.min(2 * this.retryDelay, config.maxRetryDelay);
            stats.retry++;
          }
        }
      } else {
        // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), config.timeout);
      }
    }
  }

  loadprogress(event) {
    super.loadprogress(event);
  }

  loadtimeout() {
    super.loadtimeout();
  }
}

function buf2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
