/*
  Warnings:

  - You are about to drop the `UserCompanies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserCompanies" DROP CONSTRAINT "UserCompanies_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCompanies" DROP CONSTRAINT "UserCompanies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserRoles" DROP CONSTRAINT "UserRoles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserRoles" DROP CONSTRAINT "UserRoles_user_id_fkey";

-- DropTable
DROP TABLE "public"."UserCompanies";

-- DropTable
DROP TABLE "public"."UserRoles";

-- CreateTable
CREATE TABLE "UserCompanyRoles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "UserCompanyRoles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCompanyRoles_user_id_company_id_key" ON "UserCompanyRoles"("user_id", "company_id");

-- AddForeignKey
ALTER TABLE "UserCompanyRoles" ADD CONSTRAINT "UserCompanyRoles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyRoles" ADD CONSTRAINT "UserCompanyRoles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyRoles" ADD CONSTRAINT "UserCompanyRoles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
