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
    _.map(value.buses, function(bus, busName) {
      _.map(bus.messages, function(message) {
        _.defaults(message, {
          busName: busName,
          producedBy: null,
          consumesFrom: {},
        });
        self.Messages[message.id] = message;
      })
    });
    _.map(value.nodes, function (node) {
      _.map(node.buses, function (bus) {
        _.map(bus.produces, (id) => self.Messages[id].producedBy = node.name);
        _.map(bus.consumes, (msg) => self.Messages[msg.id].consumesFrom[msg.signal_name] = node.name);
      })
    });
    this._network = value
  }

  openDialog() {
    ipcRenderer.send('KcdDatabase:open-database');
  }

  extendByNode(node) {
    var self = this;

    _.map(node.buses, function (bus) {
      _.map(bus.produces, (id) => self.Messages[id].produces = true);
      _.map(bus.consumes, (msg) => self.Messages[msg.id].consumes = true);
    })
  }

  selectNode(node) {
    _.map(this.network.nodes, (n) => n.selected = false);
    _.map(this.Messages, (msg) => msg.produces = false);
    _.map(this.Messages, (msg) => msg.consumes = false);
    this.extendByNode(node);
    node.selected = true;
  }

  selectMsg(msg) {
    this.selectedMsg = msg;
  }
}
