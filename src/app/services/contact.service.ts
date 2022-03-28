import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Icontact } from '../models/Icontact';
import { Igroup } from '../models/Igroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { }

  private server :string ="https://contact-manager-51cb3-default-rtdb.europe-west1.firebasedatabase.app/";

  public GetAllContacts(){
    let url : string = `${this.server}/contacts.json`;
    return this.http.get<Icontact []>(url).pipe(map(respons =>{
      const Array = [];
      for(const key in respons){
        Array.push({...respons[key],id:key});
      }

      return Array;
    }));
  }

  public GetContact(contactId : string){
    let url : string = `${this.server}/contacts/${contactId}.json`;
    return this.http.get<Icontact>(url).pipe();
  }

  public CreateContact(contact : Icontact):Observable<Icontact>{
    let url : string = `${this.server}/contacts.json`;
    return this.http.post<Icontact>(url, contact).pipe();
  }

  public UpdateContact(contact : Icontact, contactId:string){
    let url : string = `${this.server}/contacts/${contactId}.json`;
    return this.http.put(url, contact).pipe();
  }

  public DeleteContact(contactId:string){
    let url : string = `${this.server}/contacts/${contactId}.json`;
    return this.http.delete(url).pipe();
  }


  public GetAllGroups(): Observable<Igroup[]>{
    let url : string = `${this.server}/groups.json`;
    return this.http.get<Igroup[]>(url).pipe();
  }

  public GetGroup(contact : Icontact){
    let url : string = `${this.server}/groups/${contact.groupId}.json`
    return this.http.get<Igroup>(url).pipe();
  }

 

}
