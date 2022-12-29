import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private _URL = environment.url
  constructor(private http: HttpClient) { }

  buscarTodos() {
    return this.http.get<Room[]>(this._URL);
  }

  salvar(room: Room) {
    return this.http.post(this._URL, room);
  }

  remover(id: number) {
    return this.http.delete(`${this._URL}/${id}`);
  }

}
