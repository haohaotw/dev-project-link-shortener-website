import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UrlShortenerService} from '../../service/url-shortener.service';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  longUrl: string = '';
  shortUrl: string = '';
  copied: boolean = false;

  constructor(private urlShortenerService: UrlShortenerService) {
  }

  protected shortenUrl() {

    if (!this.longUrl) return;

    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

    if (!urlPattern.test(this.longUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    this.urlShortenerService.shortenUrl(this.longUrl).subscribe({
      next: (shortUrl) => {
        this.shortUrl = shortUrl;
        this.copied = false;
      },
      error: (error) => {
        this.shortUrl = '';
        this.copied = false;
        console.error('Error shortening URL:', error);
        alert('Failed to shorten URL. Please try again.');
      }
    });
  }

  protected copyToClipboard() {
    if (!this.shortUrl) return;
    navigator.clipboard.writeText(this.shortUrl).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
