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
    message.time = moment();
    this.messages.push(message);
    var _trace = this.traces[message.id] || new CanTrace(message);

    _trace.period = message.time.diff(_trace.time, 'milliseconds');
    _trace.count++;
    _trace.time = message.time;
    this.traces[message.id] = _trace;
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
    this.traces = _.map(this.$localStorage.canTraceLog, (trace) => new CanTrace(trace, true));
  }
}
