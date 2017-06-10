export default class LogTraceController {
  static get UID() {
    return 'LogTraceController'
  }

  constructor($scope, $timeout, $localStorage, Hotkeys, CanMessages, CanMessagesColors,
              CanStream, CanMessageParser) {
    'ngInject';

    this.connectionUrl = $localStorage.connectionUrl;
    this.creationDate = 1475730327136;

    this.$scope = $scope;
    this.$localStorage = $localStorage;
    this.$timeout = $timeout;
    this.Hotkeys = Hotkeys;
    this.CanMessages = CanMessages;
    this.CanMessagesColors = CanMessagesColors;
    this.CanStream = CanStream;

    this.save = () => CanMessages.save();
    this.diff = (trace) => CanMessages.diff(trace);
    this.paused = false;
    this.showLog = false;
    this.traceHistoryState = {};
    this.traces = {};

    this.totalItems = CanMessages.all().length;
    this.itemsPerPage = 10;
    this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage) || 1;

    this.period = {
      minValue: 0,
      maxValue: 2000,
      options: {
          floor: 0,
          ceil: 2000,
          step: 1
      }
    };
    $scope.period = this.period;
    $scope.$watchCollection('period',
      _.debounce(() => this.filterByPeriod(), 200));

    $scope.colors = () => CanMessagesColors.all();
    $scope.$watchCollection('colors()',
      _.debounce(() => CanMessagesColors.save(), 1000));

    CanStream.onMessage(function(msg) {
      if (!this.paused) {
        var pmsg = CanMessageParser.parse(msg);

        if (pmsg) {
          CanMessages.push(pmsg);
          this.traces = this.getTraces();
          $scope.$apply();
        }
      }
    }.bind(this));

    this.registerHotkeys();
    // $scope.$watch('messagesLog.length', $scope.$apply);
  }

  connect() {
    this.$localStorage.connectionUrl = this.connectionUrl;
    this.CanStream.connect(this.connectionUrl)
    // this.CanStream.send('R 126 8 0d 0e 00 00 00 00 12 ef\n');
    // this.CanStream.send('R 128 8 0f 0e 00 00 00 00 12 ef\n');
    // this.$timeout(function () {
    //   this.CanStream.send('R 126 8 0f 0e 00 00 00 00 12 ef\n');
    // }.bind(this), 1000);
    // this.$timeout(function () {
    //   this.CanStream.send('R 128 8 0f 1e 00 00 00 00 12 ef\n');
    // }.bind(this), 2000);
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
    var period = this.period;

    return _.filter(this.CanMessages.trace(),  function(trace) {
      return trace.visible && trace.period >= period.minValue &&
        (_.min([trace.period, period.options.ceil]) <= period.maxValue)
    });
  }

  load() {
    this.CanMessages.load();
    this.traces = this.getTraces();
    this.$scope.$apply();
  }

  toggleTraceHistory(traceId) {
    this.traceHistoryState[traceId] = !this.traceHistoryState[traceId]
  }

  toggleLog() {
    this.showLog = !this.showLog
  }

  clear() {
    this.traces = {}
    this.CanMessages.clear()
  }

  pause() {
    this.paused = !this.paused
  }

  excludeExisting() {
    _.each(this.traces, function (trace) {
      trace.excluded = true;
    });
    this.traces = this.getTraces()
  }
  
  showAll() {
    _.each(this.CanMessages.trace(), function (trace) {
      trace.excluded = false;
    });
    this.traces = this.getTraces()
  }

  filterByPeriod() {
    this.traces = this.getTraces()
    this.$scope.$apply();
  }

  selectMessage(message, data) {
    this.selectedMessage = _.clone(message)
    if (data) {
      this.selectedMessage.d = data
    }
  }

  isSelected(message, data) {
    return this.selectedMessage && (message.id == this.selectedMessage.id) && _.eq(data || message.d, this.selectedMessage.d)
  }

  registerHotkeys() {
    // Create simple hotkey object
    var hotkeys = [
      {
        key: ['l'],
        callback: () => this.toggleLog()
      },
      {
        key: ['p'],
        callback: () => this.pause()
      },
      {
        key: ['c'],
        callback: () => this.clear()
      },
      {
        key: ['ctrl+s', 's'],
        callback: () => this.save()
      },
      {
        key: ['ctrl+o', 'o'],
        callback: () => this.load()
      },
      {
        key: ['ctrl+x', 'x'],
        callback: () => this.excludeExisting()
      },
      {
        key: ['ctrl+a', 'a'],
        callback: () => this.showAll()
      }
    ]

    hotkeys = _.map(hotkeys, (k) => this.Hotkeys.createHotkey(k));
    _.each(hotkeys, (k) => this.Hotkeys.registerHotkey(k));
    this.$scope.$on('$destroy', function() {
      _.each(hotkeys, (k) => this.Hotkeys.deregisterHotkey(k))
    }.bind(this));
  }
}
