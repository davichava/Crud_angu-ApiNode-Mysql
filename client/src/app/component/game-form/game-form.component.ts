import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import {GamesService } from '../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  
  //se hace el json para asi utilizarlo como variable = Game
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };
//se crea una variable que empieza en falso para 
 // empezar a editar

  edit: boolean = false;


// se intancia los import que se van a utilizar 
  constructor(private gamesService: GamesService, 
              private router: Router,
              private activedRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    const params = this.activedRouter.snapshot.params;
     if (params.id) {
       this.gamesService.getGame(params.id)
         .subscribe(
           res => {
            console.log(res);  
            //hace doble enlace de datos
            this.game = res;    
            this.edit = true;      
           },
           err => console.error(err)           
         )
     }     
  }

  saveNewGame(){
    delete this.game.created_at;
    delete this.game.id;

    this.gamesService.saveGame(this.game)
    .subscribe(
      res => {
        console.log(res);  
        this.router.navigate(['/games']);      
      },
      err => console.log(err)      
    )    
  }

  updateGame(){    
    delete this.game.created_at;
    this.gamesService.updateGame(parseInt('this.game.id'), this.game)
      .subscribe(
        res => {
          console.log(res);   
          console.log(this.game);          
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      )
   }
}
