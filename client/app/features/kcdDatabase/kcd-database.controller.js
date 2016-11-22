const {ipcRenderer} = require('electron');

export default class KcdDatabaseController {
  static get UID() {
    return 'KcdDatabase'
  }

  constructor($scope, $timeout, $localStorage) {
    'ngInject';

    var kcdDatabase = $localStorage.kcdDatabase;

    this.$scope = $scope;
    this.Messages = {};
    if (kcdDatabase) {
      this.filename = kcdDatabase.filename;
      this.network = kcdDatabase.network;
    }

    ipcRenderer.on('KcdDatabase:opened', function(event, filename, network) {
      $localStorage.kcdDatabase = {
        filename: filename,
        network: network
      }
      this.filename = filename;
      this.network = network;
      $scope.$apply();
    }.bind(this))
  }

  get network() {
    return this._network
  }

  set network(value) {
    var self = this;

    console.log(value);
    _.each(value.buses, function(bus, busName) {
      _.each(bus.messages, function(message) {
        message.busName = busName;
        self.Messages[message.id] = message;
      })
    });
    this._network = value
  }

  openDialog() {
    ipcRenderer.send('KcdDatabase:open-database');
  }

  selectNode(node) {
    var self = this;

    _.map(this.network.nodes, (n) => n.selected = false);
    _.map(this.Messages, (msg) => msg.produces = false);
    _.map(this.Messages, (msg) => msg.consumes = false);
    _.map(node.buses, function (bus) {
      _.map(bus.produces, (id) => self.Messages[id].produces = true);
      _.map(bus.consumes, (msg) => self.Messages[msg.id].consumes = msg.signal_name);
    })
    node.selected = true;
  }
}
