import { Profile } from './profile.model';

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile
}

export interface ArticleComment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Profile;
}