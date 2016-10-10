import angular from 'angular';
// import uirouter from 'angular-ui-router';

import canStreamService from './canStream.service'
import canMessageParser from './canMessageParser.service'

export default angular.module('canStreamingModule', [])
  .service(canStreamService.UID, canStreamService)
  .service(canMessageParser.UID, canMessageParser)
  .name;