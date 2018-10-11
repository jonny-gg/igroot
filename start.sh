#!/bin/bash

killall bisheng &&
git checkout -b fe origin/fe || true &&
git pull &&
npm install &&
yes | cp -rf private_modules/. node_modules &&
nohup npm start 1> log 2> error &