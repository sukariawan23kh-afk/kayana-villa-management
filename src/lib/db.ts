import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 *
 * Works for both local SQLite and Netlify Postgres — the provider + URL are
 * read from env vars (see prisma/schema.prisma datasource).
 *
 * On Netlify (serverless functions), each warm function instance reuses the
 * cached client via `globalThis`. In production we also disable query
 * logging to keep function logs clean.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const isProd = process.env.NODE_ENV === "production";

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isProd ? ["error", "warn"] : ["error", "warn"],
  });

if (!isProd) globalForPrisma.prisma = db;
