import { generatetKey } from 'src/utils/common-utils';

export class Note {
  public createdAt?: string = new Date().toJSON();
  public shortDescription?: string;
  public id?: string;
  public name: string;
  public text: string;
  public categories?: any[];
  public tags?: any[];
  public color?: string;
  public colorRGBA?: string;
  constructor (note: Note) {
    this.id = note.id;
    this.name = note.name;
    this.text = note.text;
    this.shortDescription = note.shortDescription;
    this.categories = note.categories;
    this.tags = note.tags;
    this.color = note.color;
  }
}