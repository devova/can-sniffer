export default class FavoritesService {
  constructor($localStorage) {
    'ngInject';

    this.$localStorage = $localStorage;
    this.favorites = {};
    this.load();
  }

  all() {
    return this.colors;
  }

  toggleFavorite(messageId) {
    var favorite = this.favorites[messageId] || false;
    this.favorites[messageId] = !favorite;
    this.save();
  }

  isFavorite(messageId) {
    return this.favorites[messageId] || false;
  }

  save() {
    this.$localStorage.favorites = this.favorites;
  }

  load() {
    this.favorites = this.$localStorage.favorites || {};
  }
}

