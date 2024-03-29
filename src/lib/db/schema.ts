import { relations, sql } from 'drizzle-orm'
import { pgTable, integer, serial, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').unique().primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  email: text('email').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const userToken = pgTable('user_token', {
  id: serial('id').unique().primaryKey(),
  token: text('token').unique().notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expiresAt: text('expires_at').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const userRelations = relations(users, ({ many }) => ({
  userToken: many(userToken),
}))

export const userTokenRelations = relations(userToken, ({ one }) => ({
  user: one(users, {
    fields: [userToken.userId],
    references: [users.id],
  }),
}))

// export const tasks = sqliteTable(
//   'tasks',
//   {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     name: text('name').notNull(),
//     start: integer('start', { mode: 'timestamp' }).notNull(),
//     end: integer('end', { mode: 'timestamp' }).notNull(),
//     userId: integer('user_id')
//       .notNull()
//       .references(() => users.id, { onDelete: 'cascade' }),
//   },
//   (table) => ({
//     startIndex: index('start_index').on(table.start),
//     endIndex: index('end_index').on(table.end),
//     timeUniqueConstraint: unique('time_unique_constraint').on(
//       table.start,
//       table.end,
//       table.userId,
//     ),
//   }),
// )

// export const userRelations = relations(users, ({ many }) => ({
//   tasks: many(tasks),
// }))

// export const tasksRelations = relations(tasks, ({ one }) => ({
//   user: one(users, {
//     fields: [tasks.userId],
//     references: [users.id],
//   }),
// }))
