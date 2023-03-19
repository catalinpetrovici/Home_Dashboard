-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schedule_rule" TEXT NOT NULL,
    "task_rule" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_id_key" ON "schedule"("id");

-- AddForeignKey
ALTER TABLE "topic_record_by_day" ADD CONSTRAINT "topic_record_by_day_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic_device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
