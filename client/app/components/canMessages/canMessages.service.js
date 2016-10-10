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
    var _trace = this.traces[message.id] || {count: 0, time: moment()};

    _trace.period = message.time.diff(_trace.time, 'milliseconds');
    _trace.count++;
    _.extend(_trace, message);
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
    this.messages = this.$localStorage.canMessagesLog;
    this.traces = this.$localStorage.canTraceLog;
  }
}
