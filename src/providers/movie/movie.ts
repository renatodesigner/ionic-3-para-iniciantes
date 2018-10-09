import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies() {
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=" + this.getApiKey());
  }

  //acento crase para concatenar usando angular
  getMovieDetails(filmeid) {
    return this.http.get(this.baseApiPath + "/movie/"+ filmeid +"?api_key=" + this.getApiKey());
  }

  getApiKey() {
    return "e9e5edecb9aac8968c01a9d6bf55a7f2";
  }

}
