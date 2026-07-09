/*
  Warnings:

  - A unique constraint covering the columns `[studentId,tutorId,dayOfWeek,date,startTime,endTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Booking_tutorId_dayOfWeek_date_startTime_endTime_key";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_studentId_tutorId_dayOfWeek_date_startTime_endTime_key" ON "Booking"("studentId", "tutorId", "dayOfWeek", "date", "startTime", "endTime");
