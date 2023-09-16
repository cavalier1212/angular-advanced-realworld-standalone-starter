import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/post.service';
import { CreateArticle } from 'src/app/interfaces/create-article';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  formBuilder = inject(FormBuilder);
  postService = inject(PostService);

  post = this.formBuilder.group({
    title: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('body...', [Validators.required, Validators.minLength(10)]),
    tags: this.formBuilder.array([
      this.formBuilder.control('programming'),
      this.formBuilder.control('javascript'),
      this.formBuilder.control('webdev')
    ]),
  })

  get postBody() {
    return this.post.controls.body;
  }

  addTag(tag: string) {
    console.log('event: ', tag);
    if (!tag) return;
    this.post.controls.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    this.post.controls.tags.removeAt(index);
  }

  submit() {
    this.post.controls.tags.controls
    console.log('submit');
    if (this.post.invalid) return;
    // const article = this.post.value;
    const article: CreateArticle = {
      title: this.post.value.title as string,
      description: this.post.value.description as string,
      body: this.post.value.body as string,
      tagList: this.post.controls.tags.controls.map(tag=> tag.value) as string[]
    }
    console.log(article);
    this.postService.createArticle(article).subscribe();
    // this.post.reset();

  }
}
