export abstract class RepositoryBase<T> {
  /**
   * 增
   */
  abstract create(struct: T): Promise<T>

  /**
   * 删
   */
  abstract delete(struct: T): Promise<any>

  /**
   * 改
   */
  abstract update(struct: T): Promise<T>

  /**
   * 增加多个
   */
  abstract createMany(structs: T[]): Promise<T[]>

  /**
   * 删除多个
   */
  abstract deleteMany(structs: T[]): Promise<any>

  /**
   * 删除所有
   */
  deleteAll(): Promise<any> {
    throw new Error('not implemented');
  }

  /**
   * 更新多个
   */
  abstract updateMany(structs: T[]): Promise<any>

  /**
   * 查询
   */
  abstract query(...args: any): Promise<any>

  /**
   * 更新或覆盖
   */
  abstract upsert(struct: T): Promise<any>

  /**
   * 更新或覆盖多个
   */
  abstract upsertMany(structs: T[]): Promise<any>

  initialize(): Promise<any> {
    return Promise.resolve()
  }
}
