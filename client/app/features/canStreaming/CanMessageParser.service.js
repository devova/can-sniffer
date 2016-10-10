export default class CanMessageParser {
  static get UID() {
    return 'CanMessageParser'
  }

  constructor() {
    'ngInject';
    this.pattern = /^R\s.(\d{1,3})\s(\d{1,3})\s([0-9a-fA-F]{2}\s?)+/g;
  }

  parse(msg) {
    var match = this.pattern.exec(msg);

    console.log(match);
  }
}

