import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error';
  message: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData: FormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitting: boolean = false;
  formStatus: FormStatus | null = null;

  submitForm() {
    this.submitting = true;
    this.formStatus = null;

    // Simulace odeslání formuláře - ve skutečné aplikaci byste zde měli
    // volání API nebo služby pro odeslání e-mailu
    setTimeout(() => {
      // Simulace úspěšného odeslání (v 90% případů)
      if (Math.random() > 0.1) {
        this.formStatus = {
          type: 'success',
          message: 'Vaše zpráva byla úspěšně odeslána! Ozvu se co nejdříve.',
          icon: 'fas fa-check-circle'
        };

        // Reset formuláře po úspěšném odeslání
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      } else {
        // Simulace chyby (v 10% případů)
        this.formStatus = {
          type: 'error',
          message: 'Došlo k chybě při odesílání. Zkuste to prosím znovu nebo mě kontaktujte přímo e-mailem.',
          icon: 'fas fa-exclamation-circle'
        };
      }

      this.submitting = false;
    }, 1500);
  }
}
