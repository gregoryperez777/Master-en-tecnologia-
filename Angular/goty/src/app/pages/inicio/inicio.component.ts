import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  juegos: any[] = [];

  ngOnInit(): void {
    this.db.collection('goty').valueChanges()
      .pipe(
        map((resp: Game[]) => resp.map( ({ name, votes }) => ({ name,  value: votes } )))
      )
      .subscribe( juegos => {
        console.log('resp', juegos)
        this.juegos = juegos;
      });
  }

}
