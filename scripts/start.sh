#!/usr/bin/env bash
if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
 export NODE_ENV=$DEPLOYMENT_GROUP_NAME
fi

cd ~/neoui2
sudo npm install --unsafe-perm
sudo npm run start
sudo rm -r dist/tool
sudo cp -a tool dist/tool
sudo rm -r dist/magiktour
sudo cp -a magiktour dist/magiktour
sudo rm -r dist/toolv2
sudo cp -a ../neoeditor/dist/ dist/toolv2
sudo rm -r dist/toolv2/magiktour
sudo cp -a ../neoeditor/magiktour/ dist/toolv2/magiktour
#cd dist
#gzip ./tool/client/app/bundle/all.min.js
#mv ./tool/client/app/bundle/all.min.js.gz ./tool/client/app/bundle/all.min.js



