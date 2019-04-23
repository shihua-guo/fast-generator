const electron = require("electron");

const url = require("url");
const path = require("path");
const {app,BrowserWindow,Menu} = electron;
let mainWindow ;
app.on("ready",function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,"mainWindow.html"),
        protocol:"file",
        slashes:true
    }));
    //menu
    var mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
      width: 300,
      height:200,
      title:'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'src/view/nginx/index.html'),
      protocol: 'file:',
      slashes:true
    }));
    // Handle garbage collection
    addWindow.on('close', function(){
      addWindow = null;
    });
  }

const mainMenuTemplate = [
    {
        label:"file",
        submenu:[
            {
                label:"add",
                click:function(){
                    createAddWindow();
                }
            }
        ]
    },
    {
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    }
]