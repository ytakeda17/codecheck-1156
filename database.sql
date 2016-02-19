-- This file is formatted based on SQLite3's syntax
-- Some small fixes might be needed to use in other database.
CREATE SEQUENCE id_seq;
create table projects (
--    id integer PRIMARY KEY AUTOINCREMENT,
    id integer  DEFAULT nextval('id_seq') PRIMARY KEY,
    url varchar(255) NULL,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
