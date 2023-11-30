#!/bin/bash
pidfile=/data/shanjh/dify/api/logs/dify.pid
gunicorn_log=/data/shanjh/dify/api/logs/gunicorn.log
celery_log=/data/shanjh/dify/api/logs/celery.log
celery_pid=/data/shanjh/dify/api/logs/celery.pid

if [ -f /etc/init.d/functions ]; then
    source /etc/init.d/functions
fi
source /data/shanjh/dify/api/venv/bin/activate
cd /data/shanjh/dify/api
RETVAL=$?
function start() {
    gunicorn app:app -b 0.0.0.0:5001 -w 4 -p $pidfile --log-file $gunicorn_log -D --timeout 90
    celery -A app.celery worker -P gevent -c 4 -Q dataset,generation,mail --loglevel INFO --logfile $celery_log --pidfile $celery_pid --detach
}

function stop() {
    if [ ! -f $pidfile ];then
        echo $pidfile " 不存在"
    else
        pid=`cat $pidfile`
        kill -9 $pid
        kill `cat $celery_pid`
    fi
}

function reload() {
    if [ ! -f $pidfile ];then
        echo $pidfile " 不存在"
    else
        pid=`cat $pidfile`
        kill -HUP $pid
    fi
}

function restart() {
    kill -9 `ps -ef|grep dify|grep gunicorn|grep -v grep|awk '{print $2}'`
    kill `cat $celery_pid`
    sleep 10
    start
}

function status() {
    if [ ! -f $pidfile ];then
        echo $pidfile " 不存在"
    else
        pid=`cat $pidfile`
        echo "is running, pid " $pid
    fi
}

case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  reload)
        reload
        ;;
  restart)
        restart
        ;;
  status)
        status
        ;;
  *)
   echo "Usage: $0 {start|stop|restart|status|reload}"
        ;;
esac
   exit $RETVAL
