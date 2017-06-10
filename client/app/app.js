// Import Style
import 'bootswatch/superhero/bootstrap.min.css'
import 'angular-bootstrap-colorpicker/css/colorpicker.min.css'
import 'roboto-mono-webfont/roboto-mono.min.css'
import 'angularjs-slider/dist/rzslider.min.css'
import './app.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import uiBootstrap from 'angular-bootstrap-npm';
import 'ngstorage/ngStorage.min';
import 'angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min'
import 'angular-hotkeys-light/angular-hotkeys-light.min'
import 'angularjs-slider/dist/rzslider'

// Import base modules
import config from './app.config';
import routes from './app.routes';
import run from './app.run';
import appConstants from 'appConstants';

// Import CAN Messages
import controller from './components/canMessages/logTrace.controller';
import canMessagesService from './components/canMessages/canMessages.service';
import canMessagesColorsService from './components/canMessages/canMessagesColors.service';
import favoritesService from './components/canMessages/favorites.service';
import dataRowDirective from './components/canMessages/dataRow/dataRow.directive';


// Import internal modules
import canStreamingModule from './features/canStreaming';

export default angular.module('canSniffer', [uirouter, uiBootstrap, canStreamingModule,
    'ngStorage', 'colorpicker.module', 'fps.hotkeys', 'rzModule'])
  .config(config)
  .config(routes)
  .constant('AppConstants', appConstants)
  .run(run)
  .controller(controller.UID, controller)
  .service('CanMessages', canMessagesService)
  .service('CanMessagesColors', canMessagesColorsService)
  .service('FavoritesService', favoritesService)
  .directive(dataRowDirective.UID, dataRowDirective.factory)
  .name;
