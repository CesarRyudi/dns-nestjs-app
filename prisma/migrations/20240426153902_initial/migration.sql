-- CreateTable
CREATE TABLE "Testes" (
    "id" SERIAL NOT NULL,
    "content1" TEXT NOT NULL,
    "content2" TEXT NOT NULL,
    "content3" TEXT NOT NULL,
    "numer1" INTEGER NOT NULL,
    "numer2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testes_pkey" PRIMARY KEY ("id")
);
