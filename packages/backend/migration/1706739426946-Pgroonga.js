export class Pgroonga1706739426946 {
    name = 'Pgroonga1706739426946';

    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgroonga;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS pgroonga_index_note ON "note" USING "pgroonga" ("text");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS pgroonga_index_name ON "user" USING "pgroonga" ("name" pgroonga_varchar_full_text_search_ops_v2);`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS pgroonga_index_description ON "user_profile" USING "pgroonga" ("description" pgroonga_varchar_full_text_search_ops_v2);`);
    }

    async down(queryRunner) {
        // await queryRunner.query(`DROP EXTENSION IF EXISTS pgroonga;`);
        await queryRunner.query(`DROP INDEX IF EXISTS pgroonga_index_note;`);
				await queryRunner.query(`DROP INDEX IF EXISTS pgroonga_index_name;`);
				await queryRunner.query(`DROP INDEX IF EXISTS pgroonga_index_description;`);
    }
}

