#!/bin/bash

npm install
yes | cp private_modules/. node_modules
nohup npm start 1> log 2> error &