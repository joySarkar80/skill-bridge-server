/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `dayOfWeek` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tutorId,date,startTime,endTime]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,date,startTime,endTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Booking_studentId_tutorId_dayOfWeek_date_startTime_endTime_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "dayOfWeek",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "dayOfWeek",
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_tutorId_date_startTime_endTime_key" ON "Availability"("tutorId", "date", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_studentId_date_startTime_endTime_key" ON "Booking"("studentId", "date", "startTime", "endTime");
