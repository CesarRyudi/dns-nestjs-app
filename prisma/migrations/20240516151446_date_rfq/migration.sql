/*
  Warnings:

  - Changed the type of `Date_RFQ` on the `QuotesCSV` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "QuotesCSV" DROP COLUMN "Date_RFQ",
ADD COLUMN     "Date_RFQ" TIMESTAMP(3) NOT NULL;
