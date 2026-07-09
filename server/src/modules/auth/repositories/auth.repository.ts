import { users } from '@/db/schemas/schema.js';
import { eq } from 'drizzle-orm';
import db from "@/db/index.js";

export interface userData {
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  salt: string,
  avatar?: string,
  email?: string,
}

export const getUserByUsername = async (username: string) => {
  return await db.select().from(users).where(eq(users.username, username)).limit(1);
};

export const getUserById = async (id: number) => {
  return await db.select().from(users).where(eq(users.id, id)).limit(1);
};

export const createUser = async (userData: userData) => {
  return await db.insert(users).values(userData);
};

export const updateUser = async (id: number, updateData: Partial<userData>) => {
  return await db.update(users).set(updateData).where(eq(users.id, id));
};
