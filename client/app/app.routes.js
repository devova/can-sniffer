import controller from './components/canMessages/logTrace.controller';

/**
 * Routing function for sample
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($urlRouterProvider, $stateProvider) {
  $stateProvider.state("logTrace", {
    url: "/",
    template: require("./components/canMessages/logTrace.tpl.html"),
    controller: controller.UID,
    controllerAs: "c"
  });
  $urlRouterProvider.otherwise('/');
}