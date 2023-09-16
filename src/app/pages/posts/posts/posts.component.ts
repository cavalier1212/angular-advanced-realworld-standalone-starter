import { PostService } from './../../../post.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/interfaces/article';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit  {

  postService = inject(PostService)

  articles : Article[] = [];
  articles$ = this.postService.getArticles().pipe(
    map(res => res.articles)
  );

  ngOnInit(): void {
    this.postService.getArticles().subscribe(res => {
      this.articles = res.articles
    })
  }

}
