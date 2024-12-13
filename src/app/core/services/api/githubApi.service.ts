import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GitHubApiService {
  private readonly username = environment.gh.user;
  private readonly reponame = environment.gh.repo;
  private readonly token = environment.gh.apiKey;
  private readonly apiUrl = `https://api.github.com/repos/${this.username}/${this.reponame}/contents/src/app/core/json/`;

  constructor(private http: HttpClient) {}

  private encodeToBase64(content: string): string {
    return btoa(unescape(encodeURIComponent(content)));
  }

  private decodeFromBase64(content: string): string {
    return decodeURIComponent(escape(atob(content)));
  }

  generateId(prefix: string) {
    return (
      prefix + '_'+
      Math.random().toString(36).substring(2, 15) +
      new Date().getTime()
    );
  }

  getFileSha(filePath: string): Observable<string> {
    const url = `${this.apiUrl}${filePath}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(map((response) => response.sha));
  }

  loadFile(filePath: string): Observable<any> {
    const url = `${this.apiUrl}${filePath}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(
        map((response) => JSON.parse(this.decodeFromBase64(response.content)))
      );
  }

  saveFile(
    filePath: string,
    content: any,
    commitMessage: string,
    sha: string
  ): Observable<any> {
    const url = `${this.apiUrl}${filePath}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const fileContent = this.encodeToBase64(JSON.stringify(content, null, 2));

    const body = {
      message: commitMessage,
      content: fileContent,
      sha,
    };

    return this.http.put(url, body, { headers });
  }
}
