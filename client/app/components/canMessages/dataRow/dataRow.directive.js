import templateHtml from './dataRow.tpl.html'

export default class DataRow {
  static get UID() {
    return 'datarow'
  }

  constructor() {
    this.template = templateHtml;
    this.restrict = 'EA';
    this.scope = {
      data   : '=ngModel',
      diffMap: '&'
    };
  }

  link(scope) {
    scope.repr = this.repr;
    scope.diffMap = scope.diffMap() || new Array(scope.data.length);
  }

  repr(b) {
    var _b = b.toString(16);

    if (_b.length < 2) {
      _b = '0' + _b;
    }
    return _b
  }

  static factory() {
    DataRow.instance =new DataRow();
    return DataRow.instance;
  }
}