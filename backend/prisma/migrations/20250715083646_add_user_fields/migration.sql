/*
  Warnings:

  - You are about to drop the column `SlotLable` on the `ParkingSlot` table. All the data in the column will be lost.
  - You are about to drop the column `StationID` on the `ParkingSlot` table. All the data in the column will be lost.
  - You are about to drop the column `Address` on the `ParkingStation` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `ParkingStation` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `ParkingStation` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `ParkingStation` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `ParkingStation` table. All the data in the column will be lost.
  - You are about to drop the column `TotalSlots` on the `ParkingStation` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Mobile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `VehicleNumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ParkingStation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicle_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slotLable` to the `ParkingSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stationID` to the `ParkingSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `ParkingStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `ParkingStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `ParkingStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ParkingStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSlots` to the `ParkingStation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ParkingStation_Name_key";

-- DropIndex
DROP INDEX "User_Email_key";

-- DropIndex
DROP INDEX "User_Mobile_key";

-- DropIndex
DROP INDEX "User_Username_key";

-- DropIndex
DROP INDEX "User_VehicleNumber_key";

-- AlterTable
ALTER TABLE "ParkingSlot" DROP COLUMN "SlotLable",
DROP COLUMN "StationID",
ADD COLUMN     "slotLable" TEXT NOT NULL,
ADD COLUMN     "stationID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ParkingStation" DROP COLUMN "Address",
DROP COLUMN "CreatedAt",
DROP COLUMN "Latitude",
DROP COLUMN "Longitude",
DROP COLUMN "Name",
DROP COLUMN "TotalSlots",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "totalSlots" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CreatedAt",
DROP COLUMN "Email",
DROP COLUMN "Mobile",
DROP COLUMN "Password",
DROP COLUMN "Username",
DROP COLUMN "VehicleNumber",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "vehicle_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingStation_name_key" ON "ParkingStation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User_vehicle_number_key" ON "User"("vehicle_number");
