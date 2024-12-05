import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  apiKey = environment.googleApiKey;
  spreadsheetId = environment.spreadsheetId;
  private range = 'A1:D5';


  constructor() {}

  // Завантаження Google API
  public loadGoogleAPI(): void {
    if (typeof gapi === 'undefined') {
      console.error('gapi is not loaded');
      return;
    }

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.apiKey,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(() => {
        console.log('Google API Loaded');
      }).catch((error: any) => {
        console.error('Google API initialization failed: ', error);
      });
    });
  }

  // Авторизація користувача
  public signIn(): Promise<any> {
    if (typeof gapi === 'undefined') {
      console.error('gapi is not loaded');
      return Promise.reject('gapi is not loaded');
    }
    return gapi.auth2.getAuthInstance().signIn();
  }

  // Отримання даних з Google Sheets
  public getDataFromSheet(): Promise<any[]> {
    if (typeof gapi === 'undefined') {
      console.error('gapi is not loaded');
      return Promise.reject('gapi is not loaded');
    }

    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: this.range,
    }).then((response: any) => {
      const data = response.result.values || [];
      return data;
    }).catch((error: any) => {
      console.error('Error retrieving data from Google Sheets: ', error);
      return [];
    });
  }
}
