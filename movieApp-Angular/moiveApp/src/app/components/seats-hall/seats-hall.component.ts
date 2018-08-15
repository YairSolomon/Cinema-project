import { Component, OnInit, ElementRef, ViewChild, Input, Renderer } from '@angular/core';
import { Seat } from '../../models/seat';
import { HallsService } from '../../services/hall-service/halls.service';
import { Hall } from '../../models/hall';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { OrdersService } from '../../services/orders-service/orders.service';

@Component({
  selector: 'app-seats-hall',
  templateUrl: './seats-hall.component.html',
  styleUrls: ['./seats-hall.component.css']
})
export class SeatsHallComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @Input() width = 800;
  @Input() height = 600;
  ctx: CanvasRenderingContext2D
  seats = [];
  reservedSeats = [];
  clientSeats = [];
  cols: number
  data;
  id: number
  buttonStatus: boolean
  hallNumber: number;
  showId;
  updateMode: boolean;

  constructor(private rendered: Renderer, private router: Router, private hallService: HallsService, private route: ActivatedRoute, private orderService: OrdersService) {
    this.id = 0;

  }
  async ngOnInit() {

    this.updateMode = false;
    this.route.params.subscribe((params: Params) => {
      this.hallNumber = +params['number'];
      this.showId = params.showId;
    })

    this.reservedSeats = await this.orderService.getReservedSeats(this.showId);


    this.buttonStatus = false;
    this.data = await this.hallService.getHallRowsAndCols(this.hallNumber);
    this.cols = this.data.cols;
    this.seats.length = this.data.rows;

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;
    let widthCair = 30;
    let heightCair = 30;

    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(25, 25, 750, 550);
    let offsetY = canvasEl.offsetTop; /// distance from the top of the browser  (initial is 0 according our spesific canvas)
    let offsetX = canvasEl.offsetLeft;//distance from left side of the browser (initial is 66 according our spesific canvas )
    this.makeScreen() // screen draw function on the canvas 
    this.drawHall(offsetX + 150, offsetY + 100, widthCair, heightCair);
  }

  makeScreen() {
    // screan image
    let screenImage = new Image();
    screenImage.src = ' https://tickets.cinema-city.co.il/WebTixsNet/Assets/Images/NLC_Res/screen.png';
    let ctx = this.ctx;
    screenImage.onload = function () {
      ctx.drawImage(screenImage, 75, 50)
    }

  }

  drawHall(xPos, yPos, width, height) {

    let initalX = xPos;
    let endOfline = false;

    //rows
    for (let i = 0; i < this.seats.length; i++) {
      endOfline = false;
      this.seats[i] = new Array(this.cols)
      drawRows(i + 1, this.ctx);

      for (let j = 0; j < this.cols; j++) {
        this.seats[i][j] = new Seat(this.id, i + 1, j + 1, true, xPos, yPos, width, height)
        this.id++;
        if (this.resrvedSeat(this.seats[i][j], this.reservedSeats)) {
          this.ctx.fillStyle = 'red';
          this.ctx.fillRect(xPos, yPos, width, height)
          this.seats[i][j].isAvaliable = false;
        }
        else {
          this.ctx.fillStyle = 'gray';
          this.ctx.fillRect(xPos, yPos, width, height)

        }
        // cheack if seat already resarved;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(String(j + 1), xPos + 15, yPos + 20)
        xPos += 50;
      }
      endOfline = true;

      drawRows(i + 1, this.ctx)
      yPos += 40;
      xPos = initalX;

    }

    function drawRows(rowNumber, ctx) {

      //those margin is for the rows signs distance from the chairs
      let marginX;
      let marginY = 20;

      if (!endOfline) {
        marginX = 50;

      }
      else {
        marginX = -30;

      }
      ctx.textAlign = "center";
      ctx.font = "14px arial"
      ctx.fillStyle = 'black';
      ctx.fillText(String(rowNumber), xPos - marginX, yPos + marginY)

    }

    this.rendered.listen(this.ctx.canvas, 'mousedown', (event) => {

      let clieantChair = {
        x: event.clientX + 15 - this.canvas.nativeElement.offsetLeft,
        y: event.pageY - 104 - this.canvas.nativeElement.offsetTop // pay attention to pageY
      }
      for (let i = 0; i < this.seats.length; i++) {
        for (let j = 0; j < this.cols; j++) {
          let seat = this.seats[i][j];
          if (clieantChair.x <= seat.xPos + seat.width && clieantChair.x > seat.xPos && clieantChair.y <= seat.yPos + seat.height && clieantChair.y > seat.yPos) { //detect user chair
            if (seat.isAvaliable && this.clientSeats.length <= 4) { //allowed user only 5 tickes
              seat.isAvaliable = false;
              this.ctx.fillStyle = "green";
              this.ctx.fillRect(seat.xPos, seat.yPos, width, height);
              this.ctx.fillStyle = "white";
              this.ctx.fillText(String(j + 1), seat.xPos + 15, seat.yPos + 20);
              this.clientSeats.push(seat)
              this.buttonStatus = true;
              break;
            }
            else if (!seat.isAvaliable && !this.resrvedSeat(seat, this.reservedSeats)) {
              seat.isAvaliable = true;
              this.ctx.fillStyle = "gray";
              this.ctx.fillRect(seat.xPos, seat.yPos, width, height);
              this.ctx.fillStyle = "white";
              this.ctx.fillText(String(j + 1), seat.xPos + 15, seat.yPos + 20);
              this.clientSeats.splice(this.clientSeats.indexOf(seat.id), 1)
              if (this.clientSeats.length == 0) {
                this.buttonStatus = false;
              }

              break;

            }
          }
        }
      }
    });
  }

  resrvedSeat(seat, tempReservedSeats) {

    for (let i = 0; i < tempReservedSeats.length; i++) {
      if (seat.id == tempReservedSeats[i].id) {
        return true;
      }
    }
    return false
  }

  chooseSeats() {
    this.orderService.chooseSeats(this.clientSeats, this.showId);
  }

  updateHall() {

    this.rendered.listen(this.ctx.canvas, 'mousedown', (event) => {

      let width, height = 30;
      let clieantChair = {
        x: (event.clientX + 15) - this.canvas.nativeElement.offsetLeft,
        y: event.pageY - 104 - this.canvas.nativeElement.offsetTop - 17
      }

      for (let i = 0; i < this.reservedSeats.length; i++) {
        let seat = this.reservedSeats[i]

        if (clieantChair.x <= seat.xPos + seat.width && clieantChair.x > seat.xPos && clieantChair.y <= seat.yPos + seat.height && clieantChair.y > seat.yPos) {
          this.reservedSeats.splice(this.reservedSeats.indexOf(seat), 1)
          for (let i = 0; i < this.seats.length; i++) {
            for (let j = 0; j < this.cols; j++) {
              if (seat.id === this.seats[i][j].id) {

                console.log(this.seats[i][j])

                this.seats[i][j].isAvaliable = true;
                this.ctx.fillStyle = "yellow";
                this.ctx.fillText(String(j + 1), seat.xPos + 15, seat.yPos + 20);
                this.ctx.fillRect(seat.xPos, seat.yPos, width, height);
                this.orderService.updateSeats(seat, this.showId).subscribe((data) => {
                  console.log(data);
                })
                break;
              }
            }
          }
        }
      }
    })
  }
}