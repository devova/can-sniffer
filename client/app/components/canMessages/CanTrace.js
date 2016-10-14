import CanMessage from '../../features/canStreaming/CanMessage'
const MAX_HISTORY = 10

export default class CanTrace extends CanMessage {
  constructor(initData, stored) {
    super(initData)
    if (!stored) {
      this.history = []
      this.count = 0
      this.time = moment()
      this.favorite = false
    }
  }

  addHistory(data) {
    this.d = data
    this.history.unshift(data)
    this.history.length = Math.min(this.history.length, MAX_HISTORY)
  }

  diffMap(historyId) {
    return (this.history.length > 1) && (historyId < this.history.length - 1) &&
      _.map(this.history[historyId], (b, idx) => b !== this.history[historyId+1][idx])
  }
}