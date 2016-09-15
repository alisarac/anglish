import { Component } from '@angular/core';

@Component({
    selector: 'app-user-block',
    templateUrl: './user-block.component.html',
    styleUrls: ['./user-block.component.css']
})

export class UserBlockComponent{
    public users = [
        { id: 1, username: 'filip.lauc93@gmail.com', status: 'online' },
        { id: 2, username: 'laco0416@gmail.com', status: 'offline' },
        { id: 3, username: 'mgualtieri7@gmail.com', status: 'online' },
        { id: 4, username: 'ran.wahle@gmail.com', status: 'online' },
        { id: 5, username: 'wojtek.kwiatek@gmail.com', status: 'offline' }
    ];

    public isVisible: boolean = false;

    styling(even) {
        return {
            'background': even ? '#8ff76f' : '#6fccf7',
            'color': even ? '#333' : '#fff',
            'font-style': even ? 'italic' : 'normal'
        }
    }

    // Improves performance of *ngFor
    trackById(index, user) {
        return user.id
    }

    remove(user){
        console.log(user.username + " will be removed");
        this.users = this.users.filter((obj) => obj.id != user.id);
    }
}