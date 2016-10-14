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
    return '0x' + ('000' + this.id.toString(16)).slice(-3);
  }

  get diff() {
    return this.pd && _.map(this.d, (b, idx) => b !== this.pd[idx])
  }
}