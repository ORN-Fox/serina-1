import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Language } from '../../models/language/language.model';
import { Translation } from '../../models/translation/translation.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessorService {

  constructor(private httpClient: HttpClient) { }

  // Langages

  public getLanguages(): Observable<Language[]>{
    return this.httpClient.get<Language[]>(`${environment.endPointApi}/languages`);
  }

  public openLanguage(languageCode: string): Observable<Language>{
    return this.httpClient.get<Language>(`${environment.endPointApi}/language/${languageCode}/open`);
  }

  public createLanguage(languageCode: string): Observable<Language>{
    return this.httpClient.get<Language>(`${environment.endPointApi}/language/${languageCode}/create`);
  }

  public deleteLanguage(languageCode: string): Observable<void>{
    return this.httpClient.get<void>(`${environment.endPointApi}/language/${languageCode}/delete`);
  }

  // Groups

  public createGroup(groupName: string, languages: string[], levels: string): Observable<void>{
    return this.httpClient.post<void>(`${environment.endPointApi}/group/add`, {
      groupName: groupName,
      languages: languages,
      levels: levels
    });
  }

  public updateGroup(groupName: string, languages: string[], levels: string, originalGroupName: string): Observable<void>{
    return this.httpClient.post<void>(`${environment.endPointApi}/group/update`, {
      groupName: groupName,
      languages: languages,
      levels: levels,
      originalGroupName: originalGroupName
    });
  }

  public deleteGroup(groupName: string, languages: string[], levels: string): Observable<void>{
    return this.httpClient.post<void>(`${environment.endPointApi}/group/delete`, {
      groupName: groupName,
      languages: languages,
      levels: levels
    });
  }

  // Translations

  public createTranslation(languages: string[], levels: string, translation: Translation): Observable<void>{
    return this.httpClient.post<void>(`${environment.endPointApi}/translation/add`, {
      languages: languages,
      levels: levels,
      translation: translation
    });
  }

  public updateTranslation(languages: string[], levels: string, translation: Translation): Observable<void>{
    return this.httpClient.post<void>(`${environment.endPointApi}/translation/update`, {
      languages: languages,
      levels: levels,
      translation: translation
    });
  }

  public deleteTranslation(languages: string[], levels: string, translation: Translation): Observable<void>{
    return this.httpClient.post<void>(`${environment.endPointApi}/translation/delete`, {
      languages: languages,
      levels: levels,
      translation: translation
    });
  }

  // Settings

  public updateAdvancedSettings(customTranslationsPath: string, enableSortAscJson: boolean): Observable<string> {
    return this.httpClient.post(`${environment.endPointApi}/settings/update`, {
      customTranslationsPath: customTranslationsPath,
      enableSortAscJson: enableSortAscJson
    }, {responseType: 'text'});
  }

}
