import { Seat } from "./seat";

export class Order {
    
    constructor(private show:string, private ticketsNum:number, private seats:Array<Seat>,private orderDate:Date){

    }
   
}
