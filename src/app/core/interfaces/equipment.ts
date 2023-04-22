
export interface EquipmentResponse {
  hasError:  boolean;
  message:   string;
  model:     Equipment[];
  requestId: string;
}

export interface Equipment {
  id?:          number;
  name:        string;
  description: string;
}
