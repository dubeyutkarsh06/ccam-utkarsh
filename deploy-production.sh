# Show existing containers and networks. This script assumes that there is the network "sump-network"
docker ps -a
docker network ls

# Stop and remove backend container
echo -e "\nStopping and removing backend..."
docker stop backend
docker rm backend

# Stop and remove frontend container
echo -e "\nStopping and removing frontend..."
docker stop frontend
docker rm frontend

# Remove the old images
echo -e "\nRemoving images..."
docker rmi sump-backend
docker rmi sump-frontend

# Reload the images
echo -e "\nReloading images..."
docker load < sump-backend.tar
docker load < sump-frontend.tar

# Create a database backup if the database is present. Spin up a new database if it is not present.
if [ "$(docker ps -a -q -f name=database)" ]; then
  sh perform-database-backup.sh
else
  docker rmi sump-database
  docker load < sump-database.tar
  mkdir -p /var/opt/mysql/data
  mkdir -p /var/opt/mysql/backup
  docker run --detach --restart always --net sump-network -v /var/opt/mysql/data:/var/lib/mysql -p 3306:3306 --name database sump-database
fi

# Start fresh container instances
echo -e "\nStarting new containers..."
docker run --detach --restart always --net sump-network --name backend sump-backend
docker run --detach --restart always --net sump-network --name frontend --publish 8080:80 sump-frontend

echo -e "\nDone!"
