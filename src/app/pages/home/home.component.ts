import { Component } from '@angular/core';
import { Post, PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: Post[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.loadPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => console.error('Error loading posts:', err),
    });
  }

  addPost(): void {
    const newPost: Post = {
      title: 'Новий пост',
      author: 'Ivan Bro',
      date: new Date().toISOString(),
      content: 'Це новий пост.',
      tags: ['Новий', 'Пост'],
      image: 'https://example.com/new-post.jpg',
    };
    this.postsService.addPost(newPost);
    this.savePosts();
  }

  editPost(id: string): void {
    const updatedPost: Post = {
      id,
      title: 'Редагований пост',
      author: 'Ivan Bro',
      date: new Date().toISOString(),
      content: 'Цей пост був відредагований.',
      tags: ['Редагований', 'Пост'],
      image: 'https://example.com/edited-post.jpg',
    };
    this.postsService.editPost(updatedPost);
    this.savePosts();
  }

  deletePost(id: string): void {
    this.postsService.deletePost(id);
    this.savePosts();
  }

  savePosts(): void {
    this.postsService.savePosts().subscribe({
      next: (response) => {
        console.log('Posts saved successfully');
        this.loadPosts();
      },
      error: (err) => console.error('Error saving posts:', err),
    });
  }
}
