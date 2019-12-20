import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quizz } from '../../../core/models/quizz.model';
import { QuizzService } from '../../../core/services/quizz.service';
import { ActivatedRoute } from '@angular/router';
import { tinyMCE } from '../../../../environments/api-config';

@Component({
  selector: 'app-edit-quizz',
  templateUrl: './edit-quizz.component.html',
  styleUrls: ['./edit-quizz.component.scss'],
})
export class EditQuizzComponent implements OnInit {
  public id: string;
  public qcmForm: FormGroup;
  public info: string[] = [];
  public apiKey: string;
  public quizz: Quizz;
  public infoQuizz;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private quizzService: QuizzService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.apiKey = tinyMCE.apiKey;
    this.quizzService
      .readQuizz(this.id)
      .then((quizz: Quizz) => {
        this.infoQuizz = quizz;
        console.log(this.infoQuizz);
      })
      .catch(err => console.log(err));
    this.initForm();
  }
  initForm() {
    this.qcmForm = this.formBuilder.group({
      headTitle: ['', [Validators.required, Validators.minLength(3)]],
      blockQuestion: this.formBuilder.array([]),
      timePerQuestion: ['4'],
    });
  }
  initDataForUpdate(quizz: Quizz) {
    return this.formBuilder.group({
      question: ['', Validators.compose([Validators.required])],
      blockResponseQcm: this.formBuilder.array([this.blockResponseQcm()]),
      explication: [''],
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
      .then(res => {
        const modulesCourses = this.qcmForm.get('blockQuestion') as FormArray;
        modulesCourses.clear();
      })
      .catch(err => console.log(err));
  }
}
