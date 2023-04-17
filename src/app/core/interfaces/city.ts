export interface City {
  id?: string,
  name:string,
}

export interface CityResponse {
  hasError:  boolean;
  message:   string;
  model:     City[];
  requestId: string;
}
