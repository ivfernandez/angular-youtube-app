import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private youtubeService:YoutubeService) { }

  videos: Video[] = [];

  ngOnInit(): void {

    this.cargarVideos();

  }

  cargarVideos() {

    
    this.youtubeService.getVideos()
        .subscribe( resp => {

          this.videos.push(...resp);
          console.log(this.videos);
          
        }, err => {
          this.mostrarError();
        });

  }

  mostrarVideo( video:Video ) {
      
      Swal.fire({
        html: `
        <h4> ${ video.title } </h4>
        <iframe width="100%"
                       height="315"
                       src="https://www.youtube.com/embed/${ video.resourceId.videoId }"
                       frameborder="0"
                       allow="accelerometer;
                       autoplay;
                       clipboard-write;
                       encrypted-media;
                       gyroscope;
                       picture-in-picture"
                       allowfullscreen>
               </iframe>`
      })
  }

  mostrarError() {

    Swal.fire({
      title: 'No hay más videos',
      icon: 'info',
      html:
        'Ya viste todos los videos del canal',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-close"></i> Cerrar',
    })

  }

}
