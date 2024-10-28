/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "status" NOT NULL DEFAULT 'pending',
    "priority" "priority" NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedTo" TEXT[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
