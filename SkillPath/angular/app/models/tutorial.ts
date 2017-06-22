export interface Tutorial {
    id?: string;
    title?: string;
    description?: string;
    linkUrl?: string;
    tutorialCategories?: TutorialCategory[];
    imageUrl?: any;
}

export interface TutorialCategory {
    categoryId?: string;
}
