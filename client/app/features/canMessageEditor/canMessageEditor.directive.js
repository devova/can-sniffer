import templateHtml from './canMessageEditor.tpl.html'

export default class CanMessageEditor {
  static get UID() {
    return 'canMessageEditor'
  }

  constructor(CanMessageEditorService) {
    'ngInject';
    
    this.template = templateHtml;
    this.restrict = 'EA';
    this.scope = {
      msg   : '=ngModel',
      data  : '='
    };
  }

  link(scope) {
    scope.$watch('msg', function (msg) {
      if (!msg) {
        return
      }
      msg.bits = _.fill(new Array(8 * msg.length), { char:'X', tmp: true });
      for (var i in msg.signals) {
        _.fill(msg.bits, { char: String.fromCharCode(65 + parseInt(i)), signal: i}, msg.signals[i].bitOffset, msg.signals[i].bitOffset + msg.signals[i].bitLength)
      }
      _.times(msg.length - 1, (i) => msg.bits.splice(i+(i+1)*8, 0, { char: '-', tmp: true }))
      for (i in msg.bits) {
        if (i && msg.bits[i].tmp) {
          msg.bits[i] =  _.merge({}, msg.bits[i], { signal: msg.bits[i-1].signal })
        }
      }
      msg.bitGroups = _.groupBy(msg.bits, 'signal')
      msg.signalsCount =  Object.keys(msg.bitGroups).length
    });
  }

  static factory() {
    CanMessageEditor.instance =new CanMessageEditor();
    return CanMessageEditor.instance;
  }
}