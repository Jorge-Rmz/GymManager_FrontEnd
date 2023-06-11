import { City } from "../interfaces/city";

export class AddCity{
  static readonly type = '[City] Add item';
  constructor(public city: City[]) {}
}

export class GetCityById {
  static readonly type = '[City] Get by ID';
  constructor(public id: number) {}
}