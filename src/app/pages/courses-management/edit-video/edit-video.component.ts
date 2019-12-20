import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Videos } from '../../../core/models/videos.model';
import { VideosService } from '../../../core/services/videos.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss'],
})
export class EditVideoComponent implements OnInit {
  public id: string;
  public files: File[] = [];
  public isFileloaded: boolean;
  public formVideo: FormGroup;
  public title: string;
  public video: Videos;
  public infoVideo;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private videosServices: VideosService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.isFileloaded = false;
    this.videosServices
      .readVideo(this.id)
      .then((video: Videos) => {
        this.infoVideo = video;
      })
      .catch(err => console.log(err));
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
    console.log(this.files[0], this.formVideo.value['title']);
    this.videosServices
      .uploadVideo(this.files[0], this.formVideo.value['title'])
      .then((response: string) => {
        console.log(response);
        this.video = new Videos();
        this.video.clear();
        this.video.id = this.id;
        this.video.title = this.formVideo.value['title'];
        this.video.url = response;
        this.video.type = 'video';
        this.videosServices
          .updateVideo(this.video)
          .then(() => {
            this.infoVideo.url = response;
            this.isFileloaded = false;
            this.files.splice(this.files.indexOf(this.files[0]), 1);
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error);
      });
  }
}
