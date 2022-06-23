import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionSet } from '../diceroller/diceroller.component';

@Component({
  selector: 'app-animate-object-generator',
  templateUrl: './animate-object-generator.component.html',
  styleUrls: ['./animate-object-generator.component.scss'],
})
export class AnimateObjectGeneratorComponent implements OnInit {
  @Output() public done = new EventEmitter<ActionSet[]>();
  @Output() public cancel = new EventEmitter<void>();

  tinyCount: number = 10;
  smallCount: number = 0;
  mediumCount: number = 0;
  largeCount: number = 0;
  hugeCount: number = 0;

  public baseLevel: number = 5;
  public level: number = this.baseLevel;
  public base = 10;
  public upcastBonus = 2;
  constructor() {}
  getPoints(): number {
    return (this.level - this.baseLevel) * this.upcastBonus + this.base;
  }
  ngOnInit(): void {}
  hasError(){
    return this.level < 5 ||
      this.level > 9 ||
      this.getPoints() != this.takenPoints()
  }
  onDone() {
    if (this.hasError())
      return;
    let actions: ActionSet[] = [];
    if (this.tinyCount) {
      actions.push({
        actionCount: this.tinyCount,
        hitModifier: 8,
        dieCount: 1,
        die: 4,
        dmgModifier: 4,
        editMode: false,
        name: 'Animate Object lvl' + this.level + ' - '+this.tinyCount+'x tiny',
        results: [],
        roundCounter: 0,
        duration:10
      });
    }
    if (this.smallCount) {
      actions.push({
        actionCount: this.smallCount,
        hitModifier: 6,
        dieCount: 1,
        die: 8,
        dmgModifier: 2,
        editMode: false,
        name: 'Animate Object lvl' + this.level + ' - '+this.smallCount+'x small',
        results: [],
        roundCounter: 0,
        duration:10
      });
    }
    if (this.mediumCount) {
      actions.push({
        actionCount: this.mediumCount,
        hitModifier: 5,
        dieCount: 2,
        die: 6,
        dmgModifier: 1,
        editMode: false,
        name: 'Animate Object lvl' + this.level + ' - '+this.mediumCount+'x medium',
        results: [],
        roundCounter: 0,
        duration:10
      });
    }
    if (this.largeCount) {
      actions.push({
        actionCount: this.largeCount,
        hitModifier: 6,
        dieCount: 2,
        die: 10,
        dmgModifier: 2,
        editMode: false,
        name: 'Animate Object lvl' + this.level + ' - '+this.largeCount+'x large',
        results: [],
        roundCounter: 0,
        duration:10
      });
    }
    if (this.hugeCount) {
      actions.push({
        actionCount: this.hugeCount,
        hitModifier: 8,
        dieCount: 2,
        die: 12,
        dmgModifier: 4,
        editMode: false,
        name: 'Animate Object lvl' + this.level + ' - '+this.hugeCount+'x huge',
        results: [],
        roundCounter: 0,
        duration:10
      });
    }
    this.done.emit(actions);
  }
  takenPoints() {
    return this.tinyCount+ this.smallCount + this.mediumCount * 2 + this.largeCount * 4+this.hugeCount*10;
  }
}
