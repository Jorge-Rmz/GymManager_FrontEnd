import { City } from "../interfaces/city";

export class AddCity{
  static readonly type = '[City] Add item';
  constructor(public city: City[]) {}
}

