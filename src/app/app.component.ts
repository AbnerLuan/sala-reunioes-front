import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Room } from './models/room';
import { RoomService } from './services/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Room-reunioes';

  rooms: Room[] = [];

  roomForm = this.fb.group({
    id: [],
    name: [],
    date: [],
    startHour: [],
    endHour: [],
  })

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService
  ) {
    this.buscarRooms();
  }

  buscarRooms() {
    this.roomService.buscarTodos().subscribe(
      {
        next: (res) => {
          this.rooms = res;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.log('lista de rooms', this.rooms)
      }
    )
  }

  criarRoom(): Room {
    return {
      id: this.roomForm.get('id')?.value,
      name: this.roomForm.get('name')?.value,
      date: this.roomForm.get('date')?.value,
      startHour: this.roomForm.get('startHour')?.value,
      endHour: this.roomForm.get('endHour')?.value,
    }
  }

  salvar() {
    if (this.roomForm.valid) {
      const room = this.criarRoom();
      this.roomService.salvar(room).subscribe({
        next: (res) => {
          this.roomForm.reset();
          this.buscarRooms();
          alert("Room salva com sucesso")
        },
        error: (error) => {
          console.log(error);
        }
      }
      )

    }

  }

  remover(room: Room) {
    const confirmacao = confirm("Quer realmente excluir essa room?" + room.name);
    if (confirmacao) {
      this.roomService.remover(room.id).subscribe({
        next: (res) => {
          this.buscarRooms();
          alert("Room removida com sucesso!")
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}
