/*
  Warnings:

  - A unique constraint covering the columns `[customer_Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customer_Id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_customer_Id_key" ON "User"("customer_Id");
