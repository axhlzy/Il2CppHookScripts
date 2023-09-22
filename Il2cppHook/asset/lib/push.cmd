pushd %~dp0

adb push libQBDI_32.so /data/local/tmp/libQBDI_32.so
adb push libQBDI_64.so /data/local/tmp/libQBDI_64.so

adb shell su -c chmod 777 /data/local/tmp/libQBDI_32.so
adb shell su -c chmod 777 /data/local/tmp/libQBDI_64.so

adb shell su -c setenforce permissive