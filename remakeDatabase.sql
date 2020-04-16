-- command to run the script in terminal
-- 🔻 use this command when your terminal is pointing at the root directory of your project
-- psql -U postgres -a -f remakeDatabase.sql



DROP DATABASE IF EXISTS lifelogger_be;

CREATE ROLE lifelogger_user
WITH 
  LOGIN
  PASSWORD 'password'
  CREATEDB 
  SUPERUSER
  CREATEROLE
;

CREATE DATABASE lifelogger_be
  WITH 
  OWNER = lifelogger_user
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;