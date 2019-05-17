export class Category {
  constructor(
    public name: string,
    public id?: string,
    public parent?: string,
    public children?: Category[],
  ) { }
}