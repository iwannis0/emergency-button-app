import {IResourceReference} from './IResourceReference';

export interface IAnnotation {
  author?: IAnnotationAuthor;
  time?: Date;
  text: string;
}

interface IAnnotationAuthor {
  authorReference: IResourceReference;
  authorString: string;
}
