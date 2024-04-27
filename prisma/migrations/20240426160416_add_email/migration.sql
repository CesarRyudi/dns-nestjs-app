/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Testes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Testes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testes" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Testes_email_key" ON "Testes"("email");
