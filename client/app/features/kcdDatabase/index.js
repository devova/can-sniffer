import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './kcd-database.routes'
import kcdDatabaseController from './kcd-database.controller'

export default angular.module('kcd.database', [])
  .config(routes)
  .controller(kcdDatabaseController.UID, kcdDatabaseController)
  .name;