
export interface Generics {
  findById<T>(id: string): Promise<T>
  findOne<T>(where: any): Promise<T>
  deleteById<T>(id: string): Promise<T>
  find<T>(): Promise<T[]>
  update<T>(where: any, data: any): Promise<T>


}

// transform(value: T, metadata: ArgumentMetadata): R;

