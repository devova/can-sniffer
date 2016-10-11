import CanMessage from '../../features/canStreaming/CanMessage'

export default class CanTrace extends CanMessage {
  constructor(initData, stored) {
    super(initData)
    if (!stored) {
      this.count = 0
      this.time = moment()
    }
  }
}