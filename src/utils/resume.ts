

/**
 * @param module
 * @param title
 */
export const returnData = (module: any, title: string) => {
  return (module.value as any).data.find((i: { title: string; }) => i.title === title)
}
