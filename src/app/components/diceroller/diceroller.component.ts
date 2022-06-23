import { Component, OnInit } from '@angular/core';
import { Dice } from 'dice-typescript';

export interface ActionSet {
  name: string;
  die: 4 | 6 | 8 | 10 | 12;
  dieCount: number;
  hitModifier: number;
  dmgModifier: number;
  actionCount: number;
  results: DiceResult[];
  roundCounter: number;
  editMode: boolean;
  duration?: number;
}
interface DiceResult {
  hitRoll: number;
  dmgRoll: number;
}

@Component({
  selector: 'app-diceroller',
  templateUrl: './diceroller.component.html',
  styleUrls: ['./diceroller.component.scss'],
})
export class DicerollerComponent implements OnInit {
  public ac: number = 15;
  public round: number = 0;
  public sets: ActionSet[] = [];
  private dice = new Dice();
  public filterMiss = true;
  constructor() {}
  showAnimateObject: boolean = false;
  ngOnInit(): void {
    this.load();
  }
  addDiceset() {
    this.sets = [
      ...this.sets,
      {
        name: 'newActionset',
        die: 4,
        dieCount: 10,
        hitModifier: +4,
        dmgModifier: +1,
        actionCount: 1,
        results: [],
        roundCounter: 0,
        editMode: true,
      },
    ];
    this.save();
  }
  addAnimateObject() {
    this.showAnimateObject = true;
  }
  remove(set: ActionSet) {
    this.sets = this.sets.filter((x) => x != set);
    this.save();
  }
  nextAction() {
    this.round++;
    for (let set of this.sets) {
      set.roundCounter++;
      set.results = [];
      for (let cnt = 0; cnt < set.actionCount; cnt++) {
        set.results = [
          ...set.results,
          {
            hitRoll: this.dice.roll(`1d20+${set.hitModifier}`).total,
            dmgRoll: this.dice.roll(
              `${set.dieCount}d${set.die}+${set.dmgModifier}`
            ).total,
          },
        ].sort((a, b) => b.hitRoll - a.hitRoll);
      }
    }
    this.save();
  }
  toggleEdit(set: ActionSet) {
    set.editMode = !set.editMode;
  }
  OnConfirm(actions: ActionSet[]) {
    this.sets = [...this.sets, ...actions];
    this.showAnimateObject = false;
    this.save();
  }
  reset(set:null|ActionSet=null) {
    if(set){
      set.roundCounter=0;
      set.results=[];
      return;
    }

    this.round = 0;
    for (let set of this.sets) {
      set.results = [];
      set.roundCounter = 0;
    }
    this.save();
  }
  clear() {
    this.round = 0;
    this.sets = [];
    this.save();
  }
  getResults(results: DiceResult[]) {
    if (this.filterMiss) return results.filter((x) => x.hitRoll >= this.ac);
    else return results;
  }
  save() {
    console.log("save");
    localStorage.setItem(
      'sets',
      JSON.stringify({
        sets: this.sets,
        round: this.round,
        filterMiss: this.filterMiss,
        ac:this.ac,
      })
    );
  }
  load() {
    var str = localStorage.getItem('sets');
    if (str) {
      const { sets, round, filterMiss, ac } = JSON.parse(str);
      this.sets = sets ?? [];
      this.round = round ?? 0;
      this.filterMiss = filterMiss ?? true;
      this.ac = ac??15;
    } else this.addDiceset();
  }
}
