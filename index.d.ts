/// <reference types="node" />

import { Readable } from 'stream'

declare interface Options {}

declare interface PutOptions {}

declare type Input = Readable | Buffer | string | Iterable<Buffer | string>

declare class FileStoreMemory {
  constructor (options?: Options)
  put (id: string, data: Input, options?: PutOptions): Promise<void>
  get (id: string): Readable
  has (id: string): Promise<boolean>
}

export = FileStoreMemory
