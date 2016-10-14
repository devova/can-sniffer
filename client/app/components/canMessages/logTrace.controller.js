export default class LogTraceController {
  static get UID() {
    return 'LogTraceController'
  }

  constructor($scope, $timeout, $localStorage, CanMessages, CanMessagesColors,
              CanStream, CanMessageParser) {
    'ngInject';

    this.connectionUrl = $localStorage.connectionUrl;
    this.creationDate = 1475730327136;

    this._ = _;
    this.$localStorage = $localStorage;
    this.$timeout = $timeout;
    this.CanMessages = CanMessages;
    this.CanMessagesColors = CanMessagesColors;
    this.CanStream = CanStream;

    this.clear = () => CanMessages.clear();
    this.save = () => CanMessages.save();
    this.paused = false;
    this.showLog = false;
    this.traceHistoryState = {};
    this.traces = {};

    this.totalItems = CanMessages.all().length;
    this.itemsPerPage = 10;
    this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage) || 1;

    $scope.colors = () => CanMessagesColors.all();
    $scope.$watchCollection('colors()',
      _.debounce(() => CanMessagesColors.save(), 1000));

    CanStream.onMessage(function(msg) {
      if (!this.paused) {
        var pmsg = CanMessageParser.parse(msg);

        if (pmsg) {
          CanMessages.push(pmsg);
          this.traces = this.getTraces();
        }
      }
    }.bind(this));

    // $scope.$watch('messagesLog.length', $scope.$apply);
  }

  connect() {
    this.$localStorage.connectionUrl = this.connectionUrl;
    this.CanStream.connect(this.connectionUrl)
    this.CanStream.send('R 126 8 0d 0e 00 00 00 00 12 ef\n');
    this.CanStream.send('R 128 8 0f 0e 00 00 00 00 12 ef\n');
    this.$timeout(function () {
      this.CanStream.send('R 126 8 0f 0e 00 00 00 00 12 ef\n');
    }.bind(this), 1000);
    this.$timeout(function () {
      this.CanStream.send('R 128 8 0f 1e 00 00 00 00 12 ef\n');
    }.bind(this), 2000);
  }

  getMessages() {
    var all = this.CanMessages.all();

    this.totalItems = this.CanMessages.all().length;
    if (!this.paused) {
      this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
    }
    return _.slice(all, (this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  getTraces() {
    return this.CanMessages.trace();
  }

  load() {
    this.CanMessages.load();
    this.traces = this.getTraces();
  }

  toggleTraceHistory(traceId) {
    this.traceHistoryState[traceId] = !this.traceHistoryState[traceId]
  }
}
