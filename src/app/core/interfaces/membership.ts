export interface MembershipResponse {
  hasError:  boolean;
  message:   string;
  model:     Membership[];
  requestId: string;
}

export interface Membership {
  id?:        number;
  name:      string;
  cost:      number;
  createdOn: Date;
  duration:  number;
}
