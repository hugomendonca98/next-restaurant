import { relations, sql } from 'drizzle-orm'
import { pgTable, integer, serial, text, index } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: serial('id').unique().primaryKey(),
    username: text('username').unique().notNull(),
    password: text('password').notNull(),
    email: text('email').unique().notNull(),
    createdAt: text('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    emailIndex: index('email_idx').on(table.email),
    usernameIndex: index('username_idx').on(table.username),
  }),
)

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
  products: many(products),
}))

export const userTokenRelations = relations(userToken, ({ one }) => ({
  user: one(users, {
    fields: [userToken.userId],
    references: [users.id],
  }),
}))

export const products = pgTable(
  'products',
  {
    id: serial('id').unique().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    createdAt: text('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'set null' }),
  },
  (table) => ({
    nameIdx: index('name_idx').on(table.name),
    priceIdx: index('price_idx').on(table.price),
    idIdx: index('id_idx').on(table.id),
  }),
)

export const productRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  productImages: many(productImages),
}))

export const productImages = pgTable(
  'product_images',
  {
    id: serial('id').unique().primaryKey(),
    imageKey: text('image_key').notNull(),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    productIdIdx: index('product_id_idx').on(table.productId),
    imageKeyIdx: index('image_key_idx').on(table.imageKey),
  }),
)

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}))
