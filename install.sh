#!/bin/bash

command(){
  echo "";
  echo "Install $1 packages";
  cd /${PWD}/$1/;
  npm install;
}

command frontend &
command backend
wait

echo "";
echo "   ^|^e      ^|^e      ^|^e      ^|^e      ^|^e      ^|^e      ^|^e      ^|^e";