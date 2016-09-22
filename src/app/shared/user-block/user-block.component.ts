import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';


interface IFilterOption {
    id: number,
    name: string
}

@Component({
    providers: [UserService, ApiService],
    selector: 'app-user-block',
    templateUrl: './user-block.component.html',
    styleUrls: ['./user-block.component.css']
})

export class UserBlockComponent implements OnInit {
    constructor (
      private _userService: UserService,
      private _api: ApiService
    ) {

    }
    public users ;
    public filters: { [id: string] : IFilterOption; } = {};
    public results;
    public searchParameters: { [id: string] : string|number; } = {};
    public finished: boolean = false;
    public isVisible: boolean = false;

    ngOnInit(){
      this.users = this._userService.get();
      this._api.send('filters',{}).subscribe(
          res => this.filters = res,
          err => console.log(err),
          () => this.finished = true
      );
    }
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

    selectFilter(filter: IFilterOption,name: string){
        if(this.searchParameters[name] != null && filter.id == this.searchParameters[name]){
          delete(this.searchParameters[name]);
        }else{
          this.searchParameters[name] = filter.id;
        }
        this.search();
        console.log(filter.id + ":" + filter.name + " is selected");
    }

    search(){
        this._api.send('search',this.searchParameters).subscribe(
            res => this.results = res.data,
            err => console.log(err),
            () => this.finished = true
        );
    }
}