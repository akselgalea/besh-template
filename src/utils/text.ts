const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction'
})

export const FormatList = (list: string[]) => {
  return listFormatter.format(list)
}