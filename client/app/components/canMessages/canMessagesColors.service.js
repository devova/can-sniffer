export default class CanMessagesColorsService {
  constructor($localStorage) {
    'ngInject';

    this.$localStorage = $localStorage;
    this.colors = {};
    this.load();
  }

  all() {
    return this.colors;
  }

  setColor(messageId, color) {
    this.colors[messageId] = color;
    this.save();
  }

  getColor(messageId) {
    return this.colors[messageId] || '#ddeffa';
  }

  save() {
    this.$localStorage.canMessagesColors = this.colors;
  }

  load() {
    this.colors = this.$localStorage.canMessagesColors || {};
  }
}

