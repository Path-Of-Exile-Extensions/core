import {describe, expect, it} from 'vitest'
import {AssetChecksum} from "../../src";

describe('Asset Checksum', () => {
  it('should be not find difference', async () => {
    const result = AssetChecksum.diffrences(
      [["test", "123"], ["as", "234"]],
      [["test", "123"], ["as", "234"]]
    )
    expect(result).toEqual([])
  })
  it('should be find difference 1', async () => {
    const result = AssetChecksum.diffrences(
      [["test", "123"], ["as", "234"]],
      [["test", "123"], ["as", "789"]]
    )
    expect(result).toEqual([["as", "789"]])
  })
})
