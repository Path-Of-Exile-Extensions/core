/**
 * 处理 checksum 的逻辑
 */

/**
 * string1 为 文件名
 * string2 为 hash
 */
export type AssetChecksum = [string, string]

export namespace AssetChecksum {

  /**
   * 数组对比, 通过索引对比
   * 示例输入: [["test", "123"], ["as", "234"]], [["test", "123"], ["as", "789"]]
   * 示例输出: [["as", "789"]]
   * @param a
   * @param b
   */
  export const diffrences = (a: AssetChecksum[], b: AssetChecksum[]) => {
    return a.reduce((acc, cur, index) => {
      if (cur[1] != b[index][1] ) {
        acc.push(b[index])
      }
      return acc
    }, [] as AssetChecksum[])
  }

}
