#!/bin/bash
rm -rf public
mkdir public
cp -r ./assets ./public/assets
cp ./index.html ./public/index.html
cp ./404.html ./public/404.html
npm run format
firebase deploy
