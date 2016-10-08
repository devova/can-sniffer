import angular from 'angular';
// import uirouter from 'angular-ui-router';

import canStreamService from './canStream.service'

export default angular.module('canStreamingModule', [])
  .service(canStreamService.UID, canStreamService)
  .name;