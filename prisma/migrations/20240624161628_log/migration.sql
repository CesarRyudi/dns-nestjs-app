-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogError" (
    "id" SERIAL NOT NULL,
    "log_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "statusCode" TEXT NOT NULL,
    "stack" TEXT NOT NULL,

    CONSTRAINT "LogError_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogError" ADD CONSTRAINT "LogError_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "Log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
