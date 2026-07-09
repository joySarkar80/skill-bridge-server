/*
  Warnings:

  - A unique constraint covering the columns `[availabilityId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availabilityId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyRate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_studentId_date_startTime_endTime_key";

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "availabilityId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tutorName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_availabilityId_key" ON "Booking"("availabilityId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
