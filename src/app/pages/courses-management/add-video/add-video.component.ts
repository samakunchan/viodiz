import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../../core/services/courses.service';
import { Videos } from '../../../core/models/videos.model';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss'],
  animations: [zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation()],
})
export class AddVideoComponent implements OnInit {
  files: File[] = [];
  isFileloaded: boolean;
  formVideo: FormGroup;
  title: string;
  video: Videos;
  constructor(private formBuilder: FormBuilder, private coursesServices: CoursesService) {}

  ngOnInit() {
    this.isFileloaded = false;
    this.initForm();
  }

  initForm() {
    this.formVideo = this.formBuilder.group({
      title: ['', Validators.minLength(3)],
    });
  }
  onSelect(event) {
    console.log(event);
    this.isFileloaded = true;
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.isFileloaded = false;
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
    console.log(this.formVideo);
    console.log(this.files[0].name);

    this.coursesServices
      .uploadVideo(this.files[0], this.formVideo.value['title'])
      .then((response: string) => {
        this.video = new Videos();
        this.video.clear();
        this.video.title = this.formVideo.value['title'];
        this.video.url = response;
        this.video.type = 'video';
        this.coursesServices
          .createVideos(this.video)
          .then(res => {
            console.log(res);
            this.isFileloaded = false;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
