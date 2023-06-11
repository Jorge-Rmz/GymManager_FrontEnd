import { User } from "../../interfaces/user";

export class UserSet {
  static readonly type = '[User] Set item';
  constructor(public user: User[]) { }
}
