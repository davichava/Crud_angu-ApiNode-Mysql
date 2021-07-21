import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostBinding, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
 @HostBinding('class') classes = 'row';
    games : any = [];
  constructor(private gamesService: GamesService  ) { }

  ngOnInit(){
    this.getGames();
  }
  getGames(){
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.log(err)         
    );
  }
  

  deleteGame(id: string){
    this.gamesService.deleteGame(id)
      .subscribe(
        res => {
          console.log(res);
          this.  getGames();      
        },
        err => console.log(err)        
      )
  }

  
}
