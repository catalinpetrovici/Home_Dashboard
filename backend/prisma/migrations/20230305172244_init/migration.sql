-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('UNSPECIFIED', 'SENSOR', 'SWITCH', 'SLIDER', 'DISPLAY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'UNVERIFIED', 'LOST');

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
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UNVERIFIED',
    "verification_code" TEXT,
    "user_preferences_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "dark_mode" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_auth_log" (
    "log_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "users_auth_log_pkey" PRIMARY KEY ("log_date","email")
);

-- CreateTable
CREATE TABLE "device" (
    "device_family" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "default_name" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL DEFAULT 'UNSPECIFIED',
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("topic")
);

-- CreateTable
CREATE TABLE "device_data" (
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "device_data_pkey" PRIMARY KEY ("topic","created_at")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_last_name_key" ON "users"("last_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_first_name_key" ON "users"("first_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_preferences_id_key" ON "users"("user_preferences_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "device_topic_key" ON "device"("topic");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_preferences_id_fkey" FOREIGN KEY ("user_preferences_id") REFERENCES "user_preferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_auth_log" ADD CONSTRAINT "users_auth_log_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_data" ADD CONSTRAINT "device_data_topic_fkey" FOREIGN KEY ("topic") REFERENCES "device"("topic") ON DELETE RESTRICT ON UPDATE CASCADE;
