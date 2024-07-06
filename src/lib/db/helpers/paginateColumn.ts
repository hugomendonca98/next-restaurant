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
 *   limit: number,
 *   offset: number
 *   meta: {
 *     total: number,
 *     page: number,
 *     nextPage: number | null,
 *     previousPage: number | null
 *   }
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
    limit,
    offset: (page - 1) * limit,
    meta: {
      total: total[0].value,
      page,
      nextPage: hasNextPage ? page + 1 : null,
      previousPage: hasPreviousPage ? page - 1 : null,
    },
  }
}
