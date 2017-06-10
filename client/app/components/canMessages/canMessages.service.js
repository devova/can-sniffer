import CanMessage from '../../features/canStreaming/CanMessage';
import CanTrace from './CanTrace';

export default class CanMessagesService {
  constructor($localStorage, FavoritesService) {
    'ngInject';

    this.$localStorage = $localStorage;
    this.FavoritesService = FavoritesService;
    this.messages = [];
    this.traces = {};
    this.tracesChangeValue = {};
  }

  all() {
    return this.messages
  }

  push(message) {
    var trace = this.traces[message.id] || new CanTrace(message, false, this.FavoritesService)
    if (!trace.visible) {
      return
    }

    message.time = moment()
    message.pd = trace.d

    trace.period = message.time.diff(trace.time, 'milliseconds')
    trace.count++
    trace.time = message.time
    trace.addHistory(message.d)
    this.messages.unshift(message)
    this.messages.length = Math.min(this.messages.length, 500)
    this.traces[message.id] = trace
  }
  
  trace() {
    return _.sortBy(_.values(this.traces), (trace) => 1000 - this.tracesChangeValue[trace.id]);
  }

  clear() {
    this.messages = [];
    this.traces = {};
  }

  save() {
    this.$localStorage.canMessagesLog = this.messages;
    this.$localStorage.canTraceLog = this.traces;
  }

  load() {
    this.messages = _.map(this.$localStorage.canMessagesLog, (msg) => new CanMessage(msg));
    this.traces = {};
    _.forEach(this.$localStorage.canTraceLog, function(trace, id) {
      this.traces[id] = new CanTrace(trace, true, this.FavoritesService)
    }.bind(this));
  }
  
  diff(trace) {
    var diff = trace.diff

    this.tracesChangeValue[trace.id] = _.sum(diff)
    return diff
  }
}
