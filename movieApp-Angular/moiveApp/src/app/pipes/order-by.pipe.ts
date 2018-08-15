import { Pipe, PipeTransform } from '@angular/core';
import { Hall } from '../models/hall';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<Hall>, hallNumber: number): Array<Hall> {
    
    //becuse this is async action , at first the array will be undefined
    //this is the reason for the if statement 
    if(array != undefined){

    array.sort((a: any, b  : any) => {
      if (a.hallNumber < b.hallNumber) {
        return -1;
      } else if (a.hallNumber > b.hallNumber) {
        return 1;
      } else {
        return 0;
      }
    });

  }
  return array; 

  }
}