SELECT relname, n_dead_tup FROM pg_stat_user_tables;

SELECT relname, last_vacuum, last_autovacuum FROM pg_stat_user_tables;