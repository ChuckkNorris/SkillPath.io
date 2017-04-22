import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    private customers: string[] = [];
    constructor(private http: Http) {
        http.get('/api/Customer').subscribe(x => { 
            this.customers = x.json() as string[];
        });
    }
  title = 'app works!';
}
