import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

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
    FormsModule,
    TranslateModule
  ],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  formData: FormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitting: boolean = false;
  formStatus: FormStatus | null = null;
  submitted: boolean = false;

  // Konstanty pro validační limity
  readonly NAME_MIN_LENGTH = 2;
  readonly SUBJECT_MIN_LENGTH = 2;
  readonly MESSAGE_MIN_LENGTH = 10;

  constructor(protected translate: TranslationService) {}

  // Vlastní validační metody
  isNameValid(): boolean {
    return this.formData.name.length >= this.NAME_MIN_LENGTH;
  }

  isEmailValid(): boolean {
    if (!this.formData.email) return false;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(`Email: ${this.formData.email}, Valid: ${pattern.test(this.formData.email)}`);
    return pattern.test(this.formData.email);
  }

  isSubjectValid(): boolean {
    return this.formData.subject.length >= this.SUBJECT_MIN_LENGTH;
  }

  isMessageValid(): boolean {
    return this.formData.message.length >= this.MESSAGE_MIN_LENGTH;
  }

  // Metody pro získání správných chybových zpráv
  getNameErrorMessage(): string {
    if (!this.formData.name) {
      return this.translate.translate("CONTACT.NAME_WRONG");
    }
    if (this.formData.name.length < this.NAME_MIN_LENGTH) {
      return this.translate.translate("CONTACT.NAME_TOO_SHORT");
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (!this.formData.email) {
      return this.translate.translate("CONTACT.EMAIL_WRONG");
    }
    if (!this.isEmailValid()) {
      return this.translate.translate("CONTACT.EMAIL_INVALID");
    }
    return '';
  }

  getSubjectErrorMessage(): string {
    if (!this.formData.subject) {
      return this.translate.translate("CONTACT.SUBJ_WRONG");
    }
    if (this.formData.subject.length < this.SUBJECT_MIN_LENGTH) {
      return this.translate.translate("CONTACT.SUBJ_TOO_SHORT");
    }
    return '';
  }

  getMessageErrorMessage(): string {
    if (!this.formData.message) {
      return this.translate.translate("CONTACT.MESSAGE_WRONG");
    }
    if (this.formData.message.length < this.MESSAGE_MIN_LENGTH) {
      return this.translate.translate("CONTACT.MESSAGE_TOO_SHORT");
    }
    return '';
  }

  // Pomocné metody pro zobrazení chyb
  shouldShowError(fieldName: string): boolean {
    if (!this.contactForm) return false;

    const control = this.contactForm.controls[fieldName];
    return !!control && (this.submitted || (control.invalid && (control.dirty || control.touched)));
  }

  // Validace formuláře před odesláním
  validateForm(): boolean {
    // Manuální validace, která překoná výchozí validaci Angular Forms
    if (!this.isNameValid() || !this.isEmailValid() ||
      !this.isSubjectValid() || !this.isMessageValid()) {
      return false;
    }
    return true;
  }

  // Odeslání formuláře
  submitForm() {
    this.submitted = true;

    // Pokud formulář není validní, zastavíme odesílání
    if (!this.validateForm()) {
      return;
    }

    this.submitting = true;
    this.formStatus = null;

    // Simulace odeslání formuláře
    setTimeout(() => {
      // Simulace úspěšného odeslání (v 90% případů)
      if (Math.random() > 0.1) {
        this.formStatus = {
          type: 'success',
          message: this.translate.translate("CONTACT.SEND_SUCCESS"),
          icon: 'fas fa-check-circle'
        };

        // Resetování formuláře a jeho stavu
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };

        // Resetujeme stav validace
        this.submitted = false;
        if (this.contactForm) {
          this.contactForm.resetForm();
        }
      } else {
        // Simulace chyby
        this.formStatus = {
          type: 'error',
          message: this.translate.translate("CONTACT.SEND_ERROR"),
          icon: 'fas fa-exclamation-circle'
        };
      }

      this.submitting = false;
    }, 1500);
  }
}
