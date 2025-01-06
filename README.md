# CCAM

Web Application for the **CCAM Project**. Each component has it's own Docker file, readme and configuration. Deployment happens through GitLab. At first, tests are performed on a staging server using a staged database instance with test data (see `Database/Dump`). Environment configuration and secrets are controlled through GitLab (Settings -> CI/CD).

- The backend features a NestJS Application.
- The frontend is an Angular Application.
- The database is a MySQL instance which is automatically backed up daily (for the current month), monthly (for the current year) using `perform-database-backup.sh`. However the shell script has to be set up as a cron job on the deployment server itself.  
- All components are containerized and deployed automatically (see `.gitlab-ci.yml`).
