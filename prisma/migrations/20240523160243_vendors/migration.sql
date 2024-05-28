-- CreateTable
CREATE TABLE "tbl_vendors" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "walletAddress" TEXT,
    "extras" JSONB,

    CONSTRAINT "tbl_vendors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendors_uuid_key" ON "tbl_vendors"("uuid");
