import { ENV } from '../enum'

export const getEnv = (key: ENV): string => {
  const value = import.meta.env[key]
  if (value == null || value === '') {
    throw new Error(`Missing env variable: ${key}`)
  }
  return value
}
