import { Component, OnInit, ViewChild } from '@angular/core';
import { Icontact } from 'src/app/models/Icontact';
import { Igroup } from 'src/app/models/Igroup';
import { ContactService } from 'src/app/services/contact.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(private ContactService : ContactService) { }

  public loading : boolean = false;
  public contact : Icontact = {} as Icontact;
  public groups : Igroup[] = [] as Igroup[];
  public errorMassage :string | null = null;

  @ViewChild('myForm')
  mytemplateForm!:NgForm;
  

  ngOnInit(): void {
    this.ContactService.GetAllGroups().subscribe((data:Igroup[])=>{
      this.groups = data;
      console.log(this.groups);
    })
  }

  public createContact(){
    this.ContactService.CreateContact(this.contact).subscribe((data:Icontact)=>{
      this.mytemplateForm.reset();
    })
  }

}