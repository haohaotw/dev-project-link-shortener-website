import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

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

  protected shortenUrl() {
    if (!this.longUrl) return;

    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

    if (!urlPattern.test(this.longUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    const randomHash = Math.random().toString(36).substring(2, 8);
    this.shortUrl = `https://short.url/${randomHash}`;
    this.copied = false;
  }

  protected copyToClipboard() {
    if (!this.shortUrl) return;
    navigator.clipboard.writeText(this.shortUrl).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
