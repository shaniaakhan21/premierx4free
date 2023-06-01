export const getLocalStorage = (name: string) => {
  let result: object = JSON.parse(localStorage.getItem(name) ?? '{}')
  return result

}
