export enum SysFunction {
  User
}

export enum SysMethod {
  Create,
  Update
}

export enum Roles {
  Admin,
  Agent
}

export const roleMap: { [key: string]: { [key: string]: SysMethod[] } } = {
  [Roles.Admin]: {
    [SysFunction.User]: [SysMethod.Create]
  }
}

export const reverseRoleMap = Object.keys(roleMap).reduce<{
  [key: number]: { [key: number]: Roles[] }
}>((obj, role) => {
  Object.keys(roleMap[role] ?? {}).map((f) => {
    roleMap[role]?.[f]?.map((m) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      if (!obj[f]) obj[f] = {}
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      if (!obj[f][m]) obj[f][m] = []
      // @ts-ignore
      obj[f][m].push(role as unknown as Roles)
      return null
    })
    return null
  })
  return obj
}, {})

export const getRoles: (
  functions: SysFunction[],
  methods: SysMethod[]
) => Roles[] = (functions, methods) =>
  functions.map((f) => methods.map((m) => reverseRoleMap[f]?.[m] ?? [])).flat(2)

export const normalizePermissions: (
  permSets: { [key: string]: SysMethod[] }[]
) => { [key: string]: string[] } = (permSets) => {
  const perms: { [key: string]: string[] } = {}
  permSets.map((permSet) => {
    Object.keys(permSet).map((f) => {
      // @ts-ignore
      if (!perms[SysFunction[f]]) perms[SysFunction[f]] = []
      permSet?.[f]?.map((m) => {
        if (
          // @ts-ignore
          SysMethod?.[m] &&
          // @ts-ignore
          perms?.[SysFunction?.[f]]?.indexOf(SysMethod[m] ?? '') === -1
        ) {
          // @ts-ignore
          perms?.[SysFunction?.[f]]?.push(SysMethod?.[m] ?? '')
        }
        return null
      })
      return null
    })
    return null
  })
  return perms
}
