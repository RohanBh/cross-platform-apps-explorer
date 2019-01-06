const {app,BrowserWindow}=require('electron');
/*
Create a callback to handle the ready event.
 */
app.on('ready',event=>{
    'use strict';
const win=new BrowserWindow({width:800,height:600});
win.webContents.openDevTools();
/*
Notice the use of backtick characters. Usually found above the Tab key, before key 1. I wrote about this in this post: https://classmite.com/node/object-literal-notation-javascript
 */
win.loadURL(`file://${__dirname}/html/index.html`);
});