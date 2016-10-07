// Import Style
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngLocalStorage from 'angular-localstorage'

// Import base modules
import config from './app.config';
import routes from './app.routes';
import run from './app.run';
import appConstants from 'appConstants';

// Import CAN Messages
import controller from './components/canMessages/logTrace.controller';
import canMessagesService from './components/canMessages/canMessages.service';
import canMessagesColorsService from './components/canMessages/canMessagesColors.service';


// Import internal modules
// import sampleModule from './features/sample';

export default angular.module('canSniffer', [uirouter, ngLocalStorage])
  .config(config)
  .config(routes)
  .constant('AppConstants', appConstants)
  .run(run)
  .controller(controller.UID, controller)
  .service('CanMessages', canMessagesService)
  .service('CanMessagesColors', canMessagesColorsService)
  .name;
