import { Component, OnInit, Input } from '@angular/core';
import { Poll } from 'src/app/models/poll';

@Component({
  selector: 'app-sondage-modal',
  templateUrl: './sondage-modal.component.html',
  styleUrls: ['./sondage-modal.component.css']
})
export class SondageModalComponent implements OnInit {


  @Input() selectedSondage: Poll = null;

  constructor() { }

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
  }

}
