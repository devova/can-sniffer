import CanMessage from '../../features/canStreaming/CanMessage';
import CanTrace from './CanTrace';

export default class CanMessagesService {
  constructor($localStorage) {
    'ngInject';

    this.$localStorage = $localStorage;
    this.messages = [];
    this.traces = {};
  }

  all() {
    return this.messages
  }

  push(message) {
    var trace = this.traces[message.id] || new CanTrace(message)

    message.time = moment()
    message.pd = trace.d

    trace.period = message.time.diff(trace.time, 'milliseconds')
    trace.count++
    trace.time = message.time
    trace.addHistory(message.d)
    this.messages.push(message)
    this.traces[message.id] = trace
  }
  
  trace() {
    return this.traces;
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
      this.traces[id] = new CanTrace(trace, true)
    }.bind(this));
  }
}
