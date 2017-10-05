import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable()
export class LeaguesService {

    constructor (
        private http: HttpClient
    ) {}

    public getAll () {
        const endpoint = "http://localhost:3031/api/leagues";

        return this.http.get<object[]>(endpoint);
    }

    public getExtraData (teamsUrl: string, tableUrl: string) {
        const endpoint = "http://localhost:3031/api/leagues/extraData";

        return this.http.post<object[]>(endpoint, { teamsUrl, tableUrl });
    }
}