FROM mysql:8.0

# Configure database name
ENV MYSQL_DATABASE=ccam

# Initialize database with random credentials. They will be altered by a database dump
ENV MYSQL_ROOT_HOST=%
ENV MYSQL_RANDOM_ROOT_PASSWORD=yes

# Import the dumps
COPY ./Dump/* /docker-entrypoint-initdb.d/
