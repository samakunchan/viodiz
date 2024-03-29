import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Videos } from '../../../core/models/videos.model';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';
import { VideosService } from '../../../core/services/videos.service';

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
  constructor(private formBuilder: FormBuilder, private videosServices: VideosService) {}

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
    this.isFileloaded = true;
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.isFileloaded = false;
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
    this.videosServices
      .uploadVideo(this.files[0], this.formVideo.value['title'])
      .then((response: string) => {
        this.video = new Videos();
        this.video.clear();
        this.video.title = this.formVideo.value['title'];
        this.video.url = response;
        this.video.type = 'video';
        this.videosServices
          .createVideos(this.video)
          .then(() => {
            this.isFileloaded = false;
            this.files.splice(this.files.indexOf(this.files[0]), 1);
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
