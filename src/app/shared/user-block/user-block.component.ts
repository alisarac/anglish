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
    styleUrls: ['./user-block.component.css'],
})

export class UserBlockComponent implements OnInit {
    constructor (
      private _userService: UserService,
      private _api: ApiService
    ) {

    }
    public users ;
    public filters: { [id: string] : IFilterOption; } = {};
    public results: any[] = [];
    public searchParameters: { [id: string] : string|number; } = {};
    public finished: boolean = false;
    public isVisible: boolean = false;
    public selectedYear: number = 2016;
    public selectedCategory: number = 3530;
    public formCategories = [];
    public currentPage:number = 1;
    public lastPage:number = 1;

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
        if(name=='year'){
          this.selectedYear = filter.id;
        }
        this.search();
        console.log(filter.id + ":" + filter.name + " is selected");
    }

    nextPage(){
      console.log(this.currentPage, this.lastPage);
      if(this.currentPage+1 <= this.lastPage ){
        this.searchParameters['page']=this.currentPage + 1;
        this.search();
      }
    }

    search(){
        this._api.send('search',this.searchParameters).subscribe(
            res => {
              if(res.current_page > 1){
                this.results = this.results.concat(res.data);
              }else{
                this.results = res.data;
              }
              this.currentPage=res.current_page;
              this.lastPage = res.last_page;
            },
            err => console.log(err),
            () => this.finished = true
        );
    }
    appendCategories(depth, category){
      console.log(category);
      if(category.length > 0){
          if(this.formCategories.length > depth){
            this.removeLastNCategories(this.formCategories.length-depth)
          }
          this.formCategories.push(category);
      }
      console.log(this.formCategories);
    }
    removeLastNCategories(n){
      for(var i=n; i>0; i--){
        this.formCategories.pop();
      }
    }
    getCategories(depth, category){
        if(category.hasChild == 0){
          this.selectedCategory = category.id;
          console.log('devamı yok, son kategori bu');
          return;
        }
        this._api.send('categories',{year: this.selectedYear, categoryId: category.id}).subscribe(
            res => this.appendCategories(depth,res),
            err => console.log(err),
            () => this.finished = true
        );
    }
}