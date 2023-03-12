-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('UNSPECIFIED', 'STATUS', 'HUMIDITY', 'TEMPERATURE', 'ELECTRICPOWER', 'MOTIONSENSOR', 'LEDSTRIP', 'SWITCH', 'SLIDER', 'DISPLAY', 'TEXT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'UNVERIFIED', 'LOST', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNKNOWN', 'ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UNVERIFIED',
    "verification_code" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_session" (
    "user_id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "user_id" TEXT NOT NULL,
    "dark_mode" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "users_auth_log" (
    "user_id" TEXT NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_type" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "message" TEXT,

    CONSTRAINT "users_auth_log_pkey" PRIMARY KEY ("user_id","log_date")
);

-- CreateTable
CREATE TABLE "device" (
    "id" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "device_family" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_device" (
    "id" TEXT NOT NULL,
    "device_id" TEXT,
    "topic" TEXT NOT NULL,
    "qos" INTEGER NOT NULL,
    "topic_name" TEXT,
    "type" "DeviceType" NOT NULL DEFAULT 'UNSPECIFIED',
    "is_data_recorded" BOOLEAN DEFAULT false,
    "column_dashboard" INTEGER,
    "line_dashboard" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_record" (
    "topic_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT NOT NULL,

    CONSTRAINT "topic_record_pkey" PRIMARY KEY ("topic_id","created_at")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_session_session_token_key" ON "user_session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_key" ON "user_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "device_id_key" ON "device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "device_device_name_key" ON "device"("device_name");

-- CreateIndex
CREATE UNIQUE INDEX "topic_device_id_key" ON "topic_device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "topic_device_topic_key" ON "topic_device"("topic");

-- AddForeignKey
ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_auth_log" ADD CONSTRAINT "users_auth_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_device" ADD CONSTRAINT "topic_device_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_record" ADD CONSTRAINT "topic_record_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic_device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
