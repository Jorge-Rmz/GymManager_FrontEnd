import { MemberEDA } from "../../interfaces/members";

export class MemberSet {
  static readonly type = '[Member] Add item';
  constructor(public member: MemberEDA[]) { }
}
