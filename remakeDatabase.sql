-- command to run the script in terminal
-- 🔻 use this command whit your terminal is pointing at the root directory of your project
-- psql -U postgres -a -f remakeDatabase.sql

-- env: DATABASE_URL=postgres://tetris_player:password@localhost:5432/tetris_be
-- env: TEST_DATABASE_URL=postgres://tetris_player:password@localhost:5432/tetris_test_be

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