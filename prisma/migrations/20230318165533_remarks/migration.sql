/*
  Warnings:

  - You are about to drop the `OwnershipPet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OwnershipPet" DROP CONSTRAINT "OwnershipPet_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "OwnershipPet" DROP CONSTRAINT "OwnershipPet_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "OwnershipPet";

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
