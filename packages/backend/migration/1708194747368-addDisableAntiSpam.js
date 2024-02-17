export class AddDisableAntiSpam1708194747368 {
    name = 'AddDisableAntiSpam1708194747368'

    async up(queryRunner) {
				await queryRunner.query(`ALTER TABLE "meta" ADD COLUMN "disableAntiSpam" boolean NOT NULL DEFAULT true;`)
    }

    async down(queryRunner) {
				await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableAntiSpam";`)
    }
}
