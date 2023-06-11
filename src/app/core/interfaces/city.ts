export interface City {
  id?: number,
  name:string,
}

export interface CityResponse {
  hasError:  boolean;
  message:   string;
  model:     City[];
  requestId: string;
}
