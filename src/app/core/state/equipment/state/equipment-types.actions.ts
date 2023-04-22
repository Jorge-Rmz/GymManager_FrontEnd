import { Equipment } from "src/app/core/interfaces/equipment";

export class EquipmentSet {
  static readonly type = '[EquipmentTypes] Set item';
  constructor(public equipment: Equipment[]) { }
}
