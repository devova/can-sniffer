import CanMessage from './CanMessage'

export default class CanMessageParser {
  static get UID() {
    return 'CanMessageParser'
  }

  constructor() {
    'ngInject';
    this.pattern = /^R\s(\d{1,3})\s(\d{1,3})\s(([0-9a-fA-F]{2}\s?)+)/;
  }

  parse(msg) {
    var match = this.pattern.exec(msg);
    var id = parseInt(match[1], 10);
    var dlc = parseInt(match[2], 10);
    var data = match[3].split(' ').map((hex) => parseInt(hex, 16))
    var canMsg = new CanMessage({ id: id, d: data });

    return canMsg
  }
}

