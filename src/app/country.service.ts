import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  private baseUrl = 'https://api.worldbank.org/v2/country';

  constructor( private http: HttpClient) { }

  getGeneralInfo(countryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryId}?format=json`)
  }

  getPopulation(countryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryId}/indicator/c1.2?format=json`)
  }

  getLandArea(countryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryId}/indicator/AG.LND.TOTL.K2?format=json`)
  }

  getAllCountryData(countryId: string): Observable<any[]> {
    return forkJoin([
      this.getGeneralInfo(countryId),
      this.getPopulation(countryId),
      this.getLandArea(countryId)
    ])
  }


}

