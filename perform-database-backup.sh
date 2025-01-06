#!/bin/sh
current_time=$(date "+%Y-%m-%d-%H-%M-%S")
backup_file_name=all-databases-$current_time.sql
docker exec database sh -c 'exec mysqldump --all-databases -uroot -p"Zz43ms7T"' > /var/opt/mysql/backup/$backup_file_name

# remove backups older than 1 year
find /var/opt/mysql/backup/* -mtime +365 -delete

# remove daily backups from current month if today is the last day of the month
last_day=$(date -d "$(date +%Y-%m-01) +1 month -1 day" "+%d")
if [ "$(date +%d)" == "$last_day" ]; then
    current_year=$(date +%Y)
    current_month=$(date +%m)
    find /var/opt/mysql/backup/* -regex ".*-$current_year-$current_month-.*"  -delete
    current_time=$(date "+%Y-%m-%d-%H-%M-%S")
    backup_file_name=all-databases-$current_time.sql
    docker exec database sh -c 'exec mysqldump --all-databases -uroot -p"Zz43ms7T"' > /var/opt/mysql/backup/$backup_file_name
fi