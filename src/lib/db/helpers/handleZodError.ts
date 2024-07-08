import { ZodError } from 'zod'
import { generateErrorMessage } from 'zod-error'

export function fromZodError(error: ZodError) {
  return {
    error: {
      code: 'unprocessable_entity',
      message: generateErrorMessage(error.issues, {
        maxErrors: 1,
        delimiter: {
          component: ': ',
        },
        path: {
          enabled: true,
          type: 'objectNotation',
          label: '',
        },
        code: {
          enabled: true,
          label: '',
        },
        message: {
          enabled: true,
          label: '',
        },
      }),
    },
  }
}
