import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EmailService} from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [EmailService]
})
export class ContactComponent implements OnInit {

  successMessage = '';

  data: any = {
    name: '',
    subject: '',
    email: '',
    recipient: 'salimbhassine@gmail.com',
    message: ''
  };

  constructor(private emailService: EmailService) {
  }

  onSubmit(value) {
    let data = value;
    data.recipient = 'salimbhassine@gmail.com';
    this.emailService.sendEmail(data).subscribe(data => {
      this.successMessage = 'Message sent, thank you!';
      this.data = {};
    }, error => {
      this.successMessage = 'Message sent, thank you!';
      this.data = {};
    });
  }

  ngOnInit() {
  }

}
