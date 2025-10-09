export const capitalizeFirstLetter = (str: string) => {
  if (!str || typeof str !== 'string') return ''

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const commaizeNumber = (number: number) => {
  const num = Number(number)

  if (Number.isNaN(num))
    throw new Error(
      `Invalid input: expected a number, but received '${number}'`,
    )

  return num.toLocaleString('en-US')
}
