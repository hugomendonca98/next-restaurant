'server only'

import { PgTable } from 'drizzle-orm/pg-core'
import { db } from '../providers/drizzle'
import { count } from 'drizzle-orm'

interface PaginateProps {
  request: Request
  table: PgTable
}

/**
 * Retrieves pagination information for a given column.
 *
 * @param {PaginateProps} request - The request object containing the URL.
 * @param {PgTable} table - The table to retrieve pagination information from.
 * @return {Promise<{
 *   page: number,
 *   limit: number,
 *   total: number,
 *   hasNextPage: boolean,
 *   hasPreviousPage: boolean
 * }>} The pagination information.
 */
export async function paginateColumn({ request, table }: PaginateProps) {
  const { searchParams } = new URL(request.url)

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const total = await db.select({ value: count(table) }).from(table)
  const hasNextPage = page * limit < total[0].value
  const hasPreviousPage = page > 1

  return {
    page,
    limit,
    total: total[0].value,
    hasNextPage,
    hasPreviousPage,
  }
}
