import { PostService } from './../../../post.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  route = inject(ActivatedRoute); // 當前rout
  postService = inject(PostService)

  // article?: Article;
  article$ = this.route.paramMap.pipe(
    // step 1 取得路由參數
    map(data => data.get('id') || ''),
    // step 2 call api
    switchMap(id => this.postService.getArticle(id)),
    // step 3 get article object
    map(data=>data.article),
    // step 4 避免畫面重複訂閱
    shareReplay(1)
  )

  ngOnInit(): void {
    // this.route.paramMap.pipe(
    //   map(data => data.get('id') || ''),
    //   switchMap(id => this.postService.getArticle(id))
    // ).subscribe(result=>{
    //   console.log('result: ', result);
    //   this.article = result.article;
    // })

  }
}
