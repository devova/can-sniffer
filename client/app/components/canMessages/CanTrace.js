import CanMessage from '../../features/canStreaming/CanMessage'
const MAX_HISTORY = 10

export default class CanTrace extends CanMessage {
  constructor(initData, stored, FavoritesService) {
    super(initData)
    if (!stored) {
      this.history = []
      this.count = 0
      this.time = moment()
      this.excluded = false
    }

    this.FavoritesService = FavoritesService
  }

  get favorite() {
    return this.FavoritesService.isFavorite(this.id)
  }

  toggleFavorite() {
    return this.FavoritesService.toggleFavorite(this.id)
  }

  addHistory(data) {
    this.d = data
    this.history.unshift(data)
    this.history.length = Math.min(this.history.length, MAX_HISTORY)
  }

  get diff() {
    return _.map(this.d, (b, idx) => _.uniq(this.history, false, (row) => row[idx]).length > 1)
  }

  diffMap(historyId) {
    return (this.history.length > 1) && (historyId < this.history.length - 1) &&
      _.map(this.history[historyId], (b, idx) => b !== this.history[historyId+1][idx])
  }

  get visible() {
    return !this.excluded || this.favorite
  }
}