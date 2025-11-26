import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected result = '';
  protected readonly title = signal('SchulBusserl');

  constructor(private readonly http: HttpClient) {}
  
  test() {
    this.http.get('https://localhost:7243/api/application-info', { responseType: 'text' })
      .subscribe(r => this.result = r);
  }
}
