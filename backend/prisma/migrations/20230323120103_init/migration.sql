/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "device" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "schedule" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "topic_device" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "topic_record" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "topic_record_by_day" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "users_auth_log" ALTER COLUMN "log_date" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "schedule_name_key" ON "schedule"("name");
