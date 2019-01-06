const fs = require('fs');
const pa = require('path');
var d3 = require('d3');

/*
 fs module provides a method readdir() which takes, as parameter, the path of the directory, and a callback of what we want to do with the obtained files.
 Here we give it the current directory as the path
 NOTE: The path will always:
 1. Contain the full path, e.g /home/username/Desktop/....to read the Desktop. The full path always starts from the root
 2. Append a slash at the end of the path. e.g /home/username/Desktop should have the / at the end to be /home/username/Desktop/
 */
var currentPath = pa('/');
var audio_element;

function play_music(file) {
    var audio_element = document.getElementById("audio-element");
    audio_element.src = "file://" + file.substring(0, file.length - 1);
    console.log(file);
    console.log(audio_element);
    audio_element.play();
    buttonPlayPress();
}

function readFolder(path) {
    fs.readdir(path, (err, files) => {
        'use strict';
        //if an error is thrown when reading the directory, we throw it. Otherwise we continue
        if (err) throw  err;
        //the files parameter is an array of the files and folders in the path we passed. So we loop through the array, printing each file and folder
        document.getElementById('listed-files').innerHTML = `<ol id="display-files"></ol>`;
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {

                let theID = `${path}${file}/`;
                if (err) throw err;

                currentPath = pa.dirname(theID);
                document.getElementById('currentPath').innerHTML = pa.dirname(theID);
                var fileExtension = file.replace(/^.*\./, '');

                if (stats.isDirectory()) {
                    //if folder,
                    document.getElementById('display-files').innerHTML += `<a class="list-group-item" id = ${theID} ondblclick="readFolder(this.id)" ><b>Folder</b> ${file}</a>`;
                }
                //else
                else {
                    document.getElementById('display-files').innerHTML += `<a class="list-group-item" id = ${theID} ondblclick="play_music(this.id)"><b>File </b></i> ${file} <b>${fileExtension}</b></a>`;
                }
            });
        }
    });
}

function onBackPress() {
    readFolder(pa.dirname(currentPath) + "/");
}

function openFile(path) {
    shell.openItem(path);
}

var state = 'stop';

function buttonBackPress() {
}

function buttonForwardPress() {
}

function buttonRewindPress() {
}

function buttonFastforwardPress() {
}

function buttonPlayPress() {
    var audio_element = document.getElementById("audio-element");
    if (state === 'stop') {
        state = 'play';
        var button = d3.select("#button_play").classed('btn-success', true);
        button.select("i").attr('class', "fa fa-pause");
    } else if (state === 'play' || state === 'resume') {
        state = 'pause';
        d3.select("#button_play i").attr('class', "fa fa-play");
        audio_element.pause();
    } else if (state === 'pause') {
        state = 'resume';
        d3.select("#button_play i").attr('class', "fa fa-pause");
        audio_element.play();
    }
}

function buttonStopPress() {
    var audio_element = document.getElementById("audio-element");
    state = 'stop';
    var button = d3.select("#button_play").classed('btn-success', false);
    button.select("i").attr('class', "fa fa-play");
    audio_element.pause();
    audio_element.currentTime = 0;
}
