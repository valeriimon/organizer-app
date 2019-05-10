import { generatetKey } from 'src/utils/common-utils';

export class Note {
  public createdAt?: string = new Date().toJSON();
  public shortDescription?: string;
  public key?: string = generatetKey('note');
  public name: string;
  public text: string;
  public categories?: any[];
  public tags?: any[];
  public favorite?: boolean;
  public important?: boolean;
  public color?: string;
  public colorRGBA?: string;
  constructor (note: Note) {
    this.name = note.name;
    this.text = note.text;
    this.categories = note.categories;
    this.tags = note.tags;
    this.favorite = note.favorite;
    this.important = note.important;
    this.color = note.color;
  }
}