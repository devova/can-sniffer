export default class LogTraceController {
  static get UID() {
    return 'LogTraceController'
  }

  constructor($scope, $timeout, $localStorage, CanMessages, CanMessagesColors, CanStream) {
    'ngInject';

    CanMessages.push({
      id  : '0x0b6',
      data: 'd0 00 00 13 45 9f 00'
    });

    $timeout(function () {
      CanMessages.push({
        id  : '0x0b6',
        data: 'd1 00 00 13 45 9f 00'
      });
    }, 500);

    CanMessages.push({
      id  : '0x0b7',
      data: 'd0 00 00 13 45 9f 00'
    });

    $timeout(function () {
      CanMessages.push({
        id  : '0x0b7',
        data: 'e1 00 00 13 45 9f 00'
      });
    }, 800);

    this.connectionUrl = $localStorage.connectionUrl;
    this.creationDate = 1475730327136;

    this._ = _;
    this.$localStorage = $localStorage;
    this.CanMessages = CanMessages;
    this.CanMessagesColors = CanMessagesColors;
    this.CanStream = CanStream;

    this.clear = () => CanMessages.clear();
    this.save = () => CanMessages.save();
    this.load = () => CanMessages.load();
    this.paused = false;

    this.totalItems = CanMessages.all().length;
    this.itemsPerPage = 2;
    this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);

    $scope.colors = () => CanMessagesColors.all();
    $scope.$watchCollection('colors()',
      _.debounce(() => CanMessagesColors.save(), 1000));

    CanStream.onMessage((msg) => console.log(msg));
  }

  connect() {
    this.$localStorage.connectionUrl = this.connectionUrl;
    this.CanStream.connect(this.connectionUrl)
  }

  getPagedMessages() {
    var all = this.CanMessages.all();

    this.totalItems = this.CanMessages.all().length;
    if (!this.paused) {
      this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
    }
    this.messagesLog = _.slice(all, (this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  getMessages() {
    this.getPagedMessages();
    return this.messagesLog;
  }

  getTrace() {
    return this.CanMessages.trace();
  }
}
