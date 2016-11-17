
import controller from './kcd-database.controller'

/**
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("database", {
    url: "/database",
    template: require("./kcd-database.tpl.html"),
    controller: controller.UID,
    controllerAs: "c"
  });
}
