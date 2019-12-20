import { Component, OnInit } from '@angular/core';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tinyMCE } from '../../../../environments/api-config';
import { Quizz } from '../../../core/models/quizz.model';
import { QuizzService } from '../../../core/services/quizz.service';

@Component({
  selector: 'app-add-qcm',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.scss'],
  animations: [zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation()],
})
export class AddQuizzComponent implements OnInit {
  qcmForm: FormGroup;
  info: string[] = [];
  apiKey: string;
  quizz: Quizz;
  constructor(private formBuilder: FormBuilder, private quizzService: QuizzService) {}

  ngOnInit() {
    this.apiKey = tinyMCE.apiKey;
    this.initForm();
  }
  initForm() {
    this.qcmForm = this.formBuilder.group({
      headTitle: ['', [Validators.required, Validators.minLength(3)]],
      blockQuestion: this.formBuilder.array([]),
      timePerQuestion: ['4'],
    });
  }
  blockQuestionQcm() {
    return this.formBuilder.group({
      question: ['', Validators.compose([Validators.required])],
      blockResponseQcm: this.formBuilder.array([this.blockResponseQcm()]),
      explication: [''],
    });
  }
  blockQuestionTrueFalse() {
    return this.formBuilder.group({
      question: ['', Validators.compose([Validators.required])],
      blockResponseTruefalse: this.formBuilder.array([this.blockResponseTruefalse()]),
      explication: [''],
    });
  }
  blockResponseQcm() {
    return this.formBuilder.group({
      response: [''],
      expected: false,
    });
  }
  blockResponseTruefalse() {
    return this.formBuilder.group({
      responseTrue: false,
      responseFalse: false,
    });
  }
  addQuestionQcm() {
    const control = <FormArray>this.qcmForm.controls['blockQuestion'];
    control.push(this.blockQuestionQcm());
  }
  addQuestionTrueFalse() {
    const control = <FormArray>this.qcmForm.controls['blockQuestion'];
    control.push(this.blockQuestionTrueFalse());
  }
  addResponse(ix) {
    const control = (<FormArray>this.qcmForm.controls['blockQuestion']).at(ix).get('blockResponseQcm') as FormArray;
    control.push(this.blockResponseQcm());
  }
  removeQuestion(ix) {
    const modulesCourses = this.qcmForm.get('blockQuestion') as FormArray;
    modulesCourses.removeAt(ix);
  }
  removeResponse(ix, iy) {
    const control = (<FormArray>this.qcmForm.controls['blockQuestion']).at(ix).get('blockResponseQcm') as FormArray;
    control.removeAt(iy);
  }

  onSubmit() {
    this.quizz = new Quizz();
    this.quizz.clear();
    this.quizz.headTitle = this.qcmForm.value['headTitle'];
    this.quizz.blockQuestion = this.qcmForm.value['blockQuestion'];
    this.quizz.time = this.qcmForm.value['timePerQuestion'];
    this.quizz.type = 'quizz';
    this.quizzService
      .createQuizz(this.quizz)
      .then(() => {
        const modulesCourses = this.qcmForm.get('blockQuestion') as FormArray;
        modulesCourses.clear();
      })
      .catch(err => console.log(err));
  }
}
