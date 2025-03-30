import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {UrlShortenerResponse} from '../models/url-shortener-response.model';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  private readonly baseUrl = 'https://is.gd/create.php?format=json&url=';

  constructor(private http: HttpClient) {
  }


  shortenUrl(longUrl: string): Observable<string> {
    const apiUrl = `${this.baseUrl}${encodeURIComponent(longUrl)}`;

    return this.http.get<UrlShortenerResponse>(apiUrl).pipe(
      map(response => {
        if (response.errorcode) {
          throw new Error(response.errormessage || 'Unknown error occurred.');
        }
        return response.shorturl || '';
      }),
      catchError(error => {
        console.error('Error shortening URL:', error);
        return throwError(() => new Error('Failed to shorten URL. Please try again.'));
      })
    );
  }
}
