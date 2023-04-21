import { Membership } from "src/app/core/interfaces/membership";

export class MembershipSet {
  static readonly type = '[MembershipState] Set item';
  constructor(public membership: Membership[]) { }
}
