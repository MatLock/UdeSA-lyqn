--liquibase formatted sql

--changeset lynq:08-add-user-full-name
ALTER TABLE lynq_backend_db.users
    ADD COLUMN full_name VARCHAR(255) AFTER type;