import { City } from "./city";
import { Membership } from "./membership";

export interface MembersResponse {
  hasError:  boolean;
  message:   string;
  model:     Members[];
  requestId: string;
}

export interface Members {
  id?:               number;
  name:             string;
  lastName:         string;
  birthDay:         Date;
  email:            string;
  allowNewsLetter:  boolean;
  registeredOn:     Date;
  membershipEnd:    Date;
  cityId:           number;
  membershipTypeId: number;
}


// export interface MembersTem {
//   id?:               number;
//   name:             string;
//   lastName:         string;
//   birthDay:         Date;
//   email:            string;
//   allowNewsLetter:  boolean;
//   registeredOn:     Date;
//   membershipEnd:    Date;
//   cityId:           string;
//   membershipTypeId: string;
// }


//delete Member, eidt and add
export interface MemberEDA{
  id?: number;
  name: string;
  lastName: string;
  birthDay: Date;
  email: string;
  allowNewsLetter: boolean;
  registeredOn: Date;
  membershipEnd: Date;
  city: City;
  membershipType: Membership;
}

export interface ResponseMemberEDA {
  hasError: boolean;
  message: string;
  model: MemberEDA[];
  requestId: string;
}
