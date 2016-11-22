const {dialog, ipcMain} = require('electron')
var can = require('socketcan');


ipcMain.on('KcdDatabase:open-database', (event) => {
  var filename = dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {name: 'KCD Database', extensions: ['kcd', 'txt', 'xml']}
      ]
    })

  if (filename) {
    var network = can.parseNetworkDescription(filename[0]);

    event.sender.send('KcdDatabase:opened', filename[0], network)
  }

})