export class RedirectError extends Error {
  constructor() {
    super('Error with authentication token')
  }
}
