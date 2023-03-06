#! /bin/bash

JS_PATH=/home/dj_mck/dj_work/dj_web/static/js
JS_PATH_DIST=${JS_PATH}/dist/
JS_PATH_SRC=${JS_PATH}/src/

find ${JS_PATH_SRC} -type f -name "*.js" | sort | xargs cat > ${JS_PATH_DIST}game.js
