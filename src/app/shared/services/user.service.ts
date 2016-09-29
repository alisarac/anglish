import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

    private users = [
        {id: 1, username: 'filip.lauc93@gmail.com', status: 'online'},
        {id: 2, username: 'laco0416@gmail.com', status: 'offline'},
        {id: 3, username: 'mgualtieri7@gmail.com', status: 'online'},
        {id: 4, username: 'ran.wahle@gmail.com', status: 'online'},
        {id: 5, username: 'wojtek.kwiatek@gmail.com', status: 'offline'},
        {id: 6, username: 'allumxx@gmail.com', status: 'offline'},
    ]

    private users2 = [
        {id: 1, value: {username: 'filip.lauc93@gmail.com', status: 'online', hasChild: 0}},
        {id: 2, value: {username: 'laco0416@gmail.com', status: 'offline', hasChild: 0}},
        {id: 3, value: {username: 'mgualtieri7@gmail.com', status: 'online', hasChild: 0}},
        {id: 4, value: {username: 'ran.wahle@gmail.com', status: 'online', hasChild: 0}},
        {id: 5, value: {username: 'wojtek.kwiatek@gmail.com', status: 'offline', hasChild: 1}},
        {id: 6, value: {username: 'allumxx@gmail.com', status: 'offline', hasChild: 1}},
    ]

    get() {
        return this.users2;
    }
}