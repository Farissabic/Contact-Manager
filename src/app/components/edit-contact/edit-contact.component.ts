import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icontact } from 'src/app/models/Icontact';
import { Igroup } from 'src/app/models/Igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public groups : Igroup[] = [] as Igroup[];
  public contactID : string | null = null;
  public contact : Icontact = {} as Icontact;

  constructor(private contactService : ContactService, private activeRout : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.contactService.GetAllGroups().subscribe((data:Igroup[])=>{
      this.groups = data;
    });

    this.activeRout.paramMap.subscribe((param)=>{
      this.contactID = param.get('contactId');
    });
   
    if(this.contactID != null){
      console.log(this.contactID)
      this.contactService.GetContact(this.contactID).subscribe((res)=>{
        this.contact = res;
        console.log(res);
      })
    }
    
  }


  public UpdateContact(){
    if(this.contactID != null){
      this.contactService.UpdateContact(this.contact,this.contactID).subscribe((res)=>{
        this.router.navigate(['/']);
      })
    }
  }

}