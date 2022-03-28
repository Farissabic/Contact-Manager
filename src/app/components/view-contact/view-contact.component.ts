import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Icontact } from 'src/app/models/Icontact';
import { Igroup } from 'src/app/models/Igroup';


@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  constructor(private ActivatedRoute : ActivatedRoute , private contactService :ContactService) { }

  public contactID :string | null = null;
  contact :Icontact = {} as Icontact;
  group : Igroup = {} as Igroup;

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((param)=>{
      this.contactID = param.get('contactId');
    })

    if (this.contactID != null){
      this.contactService.GetContact(this.contactID).subscribe((res : Icontact)=>{
        this.contact = res;
        this.contactService.GetGroup(res).subscribe((resG)=>{
          this.group = resG;
        })
      });

    }
   
  }

}

