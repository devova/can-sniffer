const callbacks = new WeakMap();

export default class CanStream {
  static get UID() {
    return 'CanStream'
  }

  constructor() {
    this.ws = null;
    this.callbacks = [];
    this.messagesQueue = [];
    this.buffer = '';
    callbacks.set(this, this.callbacks)
  }

  connect(url): string{
    if (this.ws && this.ws.readyState == 1) {
      return
    }
    var ws = new WebSocket(url);
    this.ws = ws;

    this.ws.onopen = function() {
      _.each(this.messagesQueue, (msg) => this.ws.send(msg));
      this.messagesQueue.length = 0;
    }.bind(this);

    ws.onmessage = function (evt) {
      this._parse(evt.data);
    }.bind(this);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  onMessage(callback) {
    this.callbacks.push(callback)
  }

  send(msg) {
    if (this.ws.readyState == 1) {
      this.ws.send(msg);
    }
    else if (this.ws.readyState == 0) {
      this.messagesQueue.push(msg)
    }
  }

  _parse(msg) {
    this.buffer += msg;
      if (this.buffer.indexOf('\n') !== -1) {
        var parts = this.buffer.split('\n');

        _.each(this.callbacks, (c) => c(parts[0]));
        parts = _.slice(parts, 1);
        this.buffer = parts.join('\n');
        if (parts.length > 1) {
          this._parse('');
        }
      }
  }
}
