/*
  Warnings:

  - You are about to drop the column `is_avilable` on the `ParkingSlot` table. All the data in the column will be lost.
  - Added the required column `is_available` to the `ParkingSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSlot" DROP COLUMN "is_avilable",
ADD COLUMN     "is_available" BOOLEAN NOT NULL;
