#!/bin/bash

flag=$1
stop(){
        echo "Stopping stubs..."
        ps -ef | grep "\--stubs 5557" | grep -v grep | awk '{print $2}' | xargs kill
}

start(){
        echo "Starting stubs..."
        ./node_modules/.bin/stubby --admin 5558 --stubs 5557 --data stub/endpoints.yml  2&> stub.log &
}

restart(){
        stop
        start
}

case $flag in
        start) start;;
        stop) stop;;
        restart) restart;;
        *) restart;;
esac

