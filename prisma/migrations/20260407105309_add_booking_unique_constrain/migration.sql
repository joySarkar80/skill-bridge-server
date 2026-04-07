/*
  Warnings:

  - A unique constraint covering the columns `[tutorId,date,startTime,endTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_tutorId_date_startTime_endTime_key" ON "Booking"("tutorId", "date", "startTime", "endTime");
