-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Mobile" TEXT NOT NULL,
    "VehicleNumber" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingStation" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "TotalSlots" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParkingStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSlot" (
    "id" SERIAL NOT NULL,
    "StationID" INTEGER NOT NULL,
    "parkingStationId" INTEGER NOT NULL,
    "is_avilable" BOOLEAN NOT NULL,
    "SlotLable" TEXT NOT NULL,

    CONSTRAINT "ParkingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Mobile_key" ON "User"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User_VehicleNumber_key" ON "User"("VehicleNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingStation_Name_key" ON "ParkingStation"("Name");

-- AddForeignKey
ALTER TABLE "ParkingSlot" ADD CONSTRAINT "ParkingSlot_parkingStationId_fkey" FOREIGN KEY ("parkingStationId") REFERENCES "ParkingStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
