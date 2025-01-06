# Show existing containers and networks. This script assumes that there is the network "sump-network"
docker ps -a
docker network ls

# Stop and remove database container
echo -e "\nStopping and removing database..."
docker stop database
docker rm database

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
docker rmi sump-database
docker rmi sump-backend
docker rmi sump-frontend

# Reload the images
echo -e "\nReloading images..."
docker load < sump-database.tar
docker load < sump-backend.tar
docker load < sump-frontend.tar

# Start fresh container instances
echo -e "\nStarting new containers..."
docker run --detach --restart always --net sump-network --name database sump-database
docker run --detach --restart always --net sump-network --name backend sump-backend
docker run --detach --restart always --net sump-network --name frontend --publish 80:80 sump-frontend

echo -e "\nDone!"
