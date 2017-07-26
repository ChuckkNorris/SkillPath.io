export interface Tutorial {
    id?: string;
    title?: string;
    description?: string;
    linkUrl?: string;
    tutorialCategories?: any[];
    imageUrl?: any;
}

export interface TutorialCategory {
    categoryId?: string;
    name?: string;
    description?: string;
    icon?: string;
    tier?: number;
    parent?: any;
    parentId?: string;
    tutorialCategories?: any;
    tutorialCount?: number;
    id?: string;
    dateCreated?: string;
}
