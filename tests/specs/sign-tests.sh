#!/usr/bin/env bash
for i in *spec.js
do
    FILE=$i
    MD5SUM=`md5sum $FILE`
    BASENAME=`echo $MD5SUM | cut -d ' ' -f 2`
    JSON="${BASENAME/spec.js/details.json}"
    MD5=`echo $MD5SUM | cut -d ' ' -f 1`
    #echo "{ \"md5\": \"$MD5\", \"file\": \"$BASENAME\" }"
    echo "{ \"md5\": \"$MD5\", \"file\": \"$BASENAME\" }" > ./_details/$JSON
    echo "Processing and signing... $i ($MD5)"
done
exit 0
