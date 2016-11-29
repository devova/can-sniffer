const callbacks = new WeakMap();

export default class CanMessageEditorService {
  static get UID() {
    return 'CanMessageEditorService'
  }

  constructor() {
    this.ws = null;
    this.callbacks = [];
    this.messagesQueue = [];
    this.buffer = '';
    callbacks.set(this, this.callbacks)
  }
}
