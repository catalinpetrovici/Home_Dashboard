#!/bin/bash

command() {
  echo "";
  echo "Start $1 server";
  cd /${PWD}/$1/
  yarn dev;
}

command "frontend" &
command "backend" 
wait

echo "";
echo "✅   ✅   ✅   ✅   ✅   ✅   ✅   ✅";