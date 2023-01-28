#!/bin/bash
MAIN_PATH=${PWD};

echo "Script executed from: $STR";

command() {
  echo "";
  PATH="$MAIN_PATH/$1";
  echo "Start $PATH packages";
  cd $PATH;
  yarn dev;
}

command "frontend" &
command "backend" 
wait

echo "";
echo "✅   ✅   ✅   ✅   ✅   ✅   ✅   ✅";