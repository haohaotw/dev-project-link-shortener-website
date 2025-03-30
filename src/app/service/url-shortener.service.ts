import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  constructor(private http: HttpClient) {
  }

  shortenUrl(longUrl: string): Observable<string> {
    const apiUrl =
      `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`;
    return this.http.get<string>(apiUrl);
  }
}
