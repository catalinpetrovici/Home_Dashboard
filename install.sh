#!/bin/bash

command() {
  echo "";
  echo "Install $1 packages";
  cd /${PWD}/$1/;
  yarn install;
}

command "frontend" &
command "backend"
wait

echo "";
echo "✅   ✅   ✅   ✅   ✅   ✅   ✅   ✅";
