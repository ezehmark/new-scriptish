-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('CLINIC_ADMIN', 'CLINIC_STAFF', 'PATIENT', 'INVESTOR', 'PLATFORM_ADMIN');

-- CreateEnum
CREATE TYPE "user_statuses" AS ENUM ('ACTIVE', 'PENDING_EMAIL_VERIFICATION', 'PENDING_BAA_SIGNATURE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "clinic_types" AS ENUM ('IV_THERAPY', 'KETAMINE', 'NAD_PLUS', 'BIOLOGIC', 'ANTIBIOTIC', 'HORMONE_TRT', 'HOME_INFUSION', 'OTHER');

-- CreateEnum
CREATE TYPE "clinic_statuses" AS ENUM ('REGISTERED', 'BAA_PENDING', 'ACTIVE', 'SUSPENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "hospital_statuses" AS ENUM ('REGISTERED', 'BAA_PENDING', 'ACTIVE', 'SUSPENDED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" "user_roles" NOT NULL,
    "status" "user_statuses" NOT NULL,
    "clinic_id" TEXT,
    "patient_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clinic_type" "clinic_types" NOT NULL,
    "npi_number" VARCHAR(10) NOT NULL,
    "tax_id" TEXT NOT NULL,
    "state_license_number" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zip_code" TEXT NOT NULL,
    "primary_phone" TEXT NOT NULL,
    "work_email" TEXT NOT NULL,
    "infusion_chair_count" INTEGER NOT NULL,
    "treatment_types_offered" TEXT[],
    "service_area" TEXT[],
    "status" "clinic_statuses" NOT NULL,
    "baa_signed_at" TIMESTAMP(3),
    "baa_signed_by" TEXT,
    "activated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "npi_number" VARCHAR(10) NOT NULL,
    "tax_id" TEXT NOT NULL,
    "state_license_number" TEXT NOT NULL,
    "primary_office_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zip_code" TEXT NOT NULL,
    "primary_phone" TEXT NOT NULL,
    "work_email" TEXT NOT NULL,
    "contact_person_first_name" TEXT NOT NULL,
    "contact_person_last_name" TEXT NOT NULL,
    "contact_person_title" TEXT NOT NULL,
    "status" "hospital_statuses" NOT NULL,
    "baa_signed_at" TIMESTAMP(3),
    "baa_signed_by" TEXT,
    "activated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_clinic_id_idx" ON "users"("clinic_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clinics_npi_number_key" ON "clinics"("npi_number");

-- CreateIndex
CREATE UNIQUE INDEX "clinics_work_email_key" ON "clinics"("work_email");

-- CreateIndex
CREATE INDEX "clinics_npi_number_idx" ON "clinics"("npi_number");

-- CreateIndex
CREATE INDEX "clinics_state_idx" ON "clinics"("state");

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_npi_number_key" ON "hospitals"("npi_number");

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_work_email_key" ON "hospitals"("work_email");

-- CreateIndex
CREATE INDEX "hospitals_npi_number_idx" ON "hospitals"("npi_number");

-- CreateIndex
CREATE INDEX "hospitals_state_idx" ON "hospitals"("state");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
