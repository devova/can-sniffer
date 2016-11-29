import './canMessageEditor.scss'

import 'ngstorage/ngStorage.min';
import angular from 'angular';

import canMessageEditorService from './canMessageEditor.service'
import canMessageEditorDirective from './canMessageEditor.directive'

export default angular.module('can.message.editor', ['ngStorage'])
  .service(canMessageEditorService.UID, canMessageEditorService)
  .directive(canMessageEditorDirective.UID, canMessageEditorDirective.factory)
  .name;