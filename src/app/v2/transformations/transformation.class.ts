import { CloudNode } from '../cloud-node.class';

export class Transformation {

  protected targetNode: CloudNode;
  protected propagateTo: CloudNode[];
  protected relativeTo?: CloudNode;

}