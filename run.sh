#!/bin/bash

cd /mnt/c/Fitted/toro-warehouse-service

while true
do 
	npm run start:companyInfo
	npm run start:logos
	npm run start:socialSentiments
    sleep 60
done 