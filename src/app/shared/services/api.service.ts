import {Injectable} from '@angular/core'
import {Http, Headers, RequestMethod, Request, URLSearchParams} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
    constructor (
        private _http: Http
    ) {}

    // Our primary method. It accepts the name of the api request we want to make, an item if the request is a post request and the id if required
    send(name, params, item?, id?) {

        let url: string,                            // The url that we should post to
            type: any,                              // Type of the request ['post', 'put', 'get', 'delete']
            body: any;                              // Body of the request

        // Set the right url using the provided name
        switch (name) {
            // Get all users
            case 'filters':
                url = 'http://api.ogaraj.com/api/adfilters';
                type = RequestMethod.Get;
                break;
            //http://api.ogaraj.com/api/ads?size=50&year=2011&make=3549&fuel=Benzin&gear=Manuel&body_type=Hatchback%205%20kap%C4%B1
            case 'search':
                url = 'http://api.ogaraj.com/api/ads';
                type = RequestMethod.Get;
                break;
            // All we need to do to handle new API calls is add them inside of this switch statement
        }

        let parameters = new URLSearchParams();
        for(let key in params){
            parameters.set(key, params[key]);
        }
        // Define the options for the request
        let options = {
            method: type,
            url: url,
            body: null,
            search: parameters,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        // If the passed item is a string use it
        // Otherwise json stringify it
        if (item) {
            body = typeof item === 'string' ? item : JSON.stringify(item);
            options.body = body;
        }

        // Returns an observable
        return this._http.request(new Request(options))
            .map(res => res.json())
            .catch(this.logError);
    }

    // Error handling
    private logError (error: Error) {
        return Observable.throw(error || 'There was an error with the request');
    }
}