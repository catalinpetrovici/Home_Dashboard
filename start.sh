#!/bin/bash

echo "Script executed from: ${PWD}";

command(){
  echo "";
  echo "Start $1 packages";
  cd /${PWD}/$1/;
  npm run dev;
}

command frontend &
command backend 
wait

echo "";
echo "   ^|^e      ^|^e      ^|^e      ^|^e      ^|^e      ^|^e      ^|^e      ^|^e";