export class Note {
  public createdAt?: string = new Date().toJSON();
  constructor (
    public name: string,
    public text: string,
    public categories?: any[],
    public tags?: any[],
    public favorite?: boolean,
    public important?: boolean,
    public color?: string
  ) {}
}