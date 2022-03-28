import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icontact } from 'src/app/models/Icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  constructor(private ContactService : ContactService, private activeRoute :ActivatedRoute, private router:Router) { }

  public loading:boolean = false;
  public contacts : Icontact[] = [];
  public search: string | null= null


  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param)=>{
      this.search = param.get('searchName');
    });
    this.getAllContacts();
  }

  
  public SearchContact(){
    if(this.search){
      this.router.navigateByUrl('/contacts/search/'+ this.search);
    }
  }

  public getAllContacts(){
    this.loading = true;
    this.ContactService.GetAllContacts().subscribe((data:any)=>{
      this.activeRoute.params.subscribe(param=>{
        if(param['searchName']){


          for(let dat of data){
            if(dat.name == this.search){
              this.contacts.push(dat);
              console.log(dat)
            }
          }
        }else{
          this.contacts = data;
        }
      })
      
     
      this.loading = false;
    })
  }


  public contactDelete(contactID : string | undefined){
    if(contactID){
      this.ContactService.DeleteContact(contactID).subscribe(()=>{
        this.getAllContacts();
        this.router.navigateByUrl('/');
      });
    }
  }

}