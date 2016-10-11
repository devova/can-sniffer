export default class CanMessage {
  constructor(initData) {
    _.extend(this, initData)
  }

  get data() {
    return _.map(this.d, function(b) {
      b =  b.toString(16);
      if (b.length < 2) {
        b = '0' + b;
      }
      return b
    })
  }

  get Id() {
    return '0x' + ('0000' + this.id.toString(16)).slice(-4);
  }
}