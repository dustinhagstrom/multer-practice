-- database name: 'image_upload'
-- check db configuration in server/modules/pool.js

-- relation (table) name: 'image'
-- verify table name is correctly referenced in routes
--      server/modules/routes/pics.router.js

DROP TABLE IF EXISTS image;

CREATE TABLE image (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	data BYTEA
);