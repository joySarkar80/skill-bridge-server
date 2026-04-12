/*
  Warnings:

  - A unique constraint covering the columns `[tutorId,dayOfWeek,date,startTime,endTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayOfWeek` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_tutorId_date_startTime_endTime_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_tutorId_dayOfWeek_date_startTime_endTime_key" ON "Booking"("tutorId", "dayOfWeek", "date", "startTime", "endTime");
