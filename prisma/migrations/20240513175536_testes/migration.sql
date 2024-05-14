/*
  Warnings:

  - You are about to drop the column `EDD_Customer` on the `QuotesCSV` table. All the data in the column will be lost.
  - You are about to drop the column `EDD_vendor` on the `QuotesCSV` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `QuotesCSV` table. All the data in the column will be lost.
  - You are about to drop the column `Quote` on the `QuotesCSV` table. All the data in the column will be lost.
  - You are about to drop the column `id_cotacao` on the `QuotesCSV` table. All the data in the column will be lost.
  - You are about to drop the `QuotesTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Table` to the `QuotesCSV` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuotesCSV" DROP COLUMN "EDD_Customer",
DROP COLUMN "EDD_vendor",
DROP COLUMN "ID",
DROP COLUMN "Quote",
DROP COLUMN "id_cotacao",
ADD COLUMN     "Customer_PO_Receipt" TEXT,
ADD COLUMN     "Location" TEXT,
ADD COLUMN     "Log_Company" TEXT,
ADD COLUMN     "Table" TEXT NOT NULL,
ALTER COLUMN "Customer" DROP NOT NULL,
ALTER COLUMN "BUYER" DROP NOT NULL,
ALTER COLUMN "DESC" DROP NOT NULL,
ALTER COLUMN "QTY" DROP NOT NULL,
ALTER COLUMN "PN_ALT" DROP NOT NULL,
ALTER COLUMN "DESC_PN_ALT" DROP NOT NULL,
ALTER COLUMN "OEM" DROP NOT NULL,
ALTER COLUMN "SOURCE_1" DROP NOT NULL,
ALTER COLUMN "SOURCE_2" DROP NOT NULL,
ALTER COLUMN "SOURCE_3" DROP NOT NULL,
ALTER COLUMN "DATE" DROP NOT NULL,
ALTER COLUMN "LT" DROP NOT NULL,
ALTER COLUMN "REMARKS" DROP NOT NULL,
ALTER COLUMN "Concluido" DROP NOT NULL,
ALTER COLUMN "Customer_PO" DROP NOT NULL,
ALTER COLUMN "TERMS" DROP NOT NULL,
ALTER COLUMN "CURRENCY" DROP NOT NULL,
ALTER COLUMN "PRECO_COMPRA" DROP NOT NULL,
ALTER COLUMN "Vendor" DROP NOT NULL,
ALTER COLUMN "AVAILABLE" DROP NOT NULL,
ALTER COLUMN "CONDITION" DROP NOT NULL,
ALTER COLUMN "VEND_DELIVERY" DROP NOT NULL,
ALTER COLUMN "FINAL_DESTINATION" DROP NOT NULL,
ALTER COLUMN "OBS" DROP NOT NULL,
ALTER COLUMN "PN_Manufacturer" DROP NOT NULL,
ALTER COLUMN "Status_Quantum" DROP NOT NULL,
ALTER COLUMN "vendor_PO" DROP NOT NULL,
ALTER COLUMN "SO" DROP NOT NULL,
ALTER COLUMN "money_LUCRO" DROP NOT NULL,
ALTER COLUMN "Total_LUCRO" DROP NOT NULL,
ALTER COLUMN "Sales_Code" DROP NOT NULL,
ALTER COLUMN "ABBREV" DROP NOT NULL,
ALTER COLUMN "EMAIL" DROP NOT NULL,
ALTER COLUMN "Cotacao_Quantum" DROP NOT NULL;

-- DropTable
DROP TABLE "QuotesTest";

-- DropTable
DROP TABLE "Testes";
