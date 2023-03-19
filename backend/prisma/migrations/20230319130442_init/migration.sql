/*
  Warnings:

  - You are about to drop the column `schedule_rule` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `task_rule` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `repeat` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rule` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Repeat" AS ENUM ('ONCE', 'INTERVAL', 'INTERVAL_BETWEEN_TIMES', 'AT_SPECIFIC_TIME');

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "schedule_rule",
DROP COLUMN "task_rule",
ADD COLUMN     "repeat" "Repeat" NOT NULL,
ADD COLUMN     "rule" TEXT NOT NULL;
