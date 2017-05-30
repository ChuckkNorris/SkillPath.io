export interface Tutorial {
    title?: string;
    description?: string;
    linkUrl?: string;
    tutorialCategories?: TutorialCategory[];
}

export interface TutorialCategory {
    categoryId?: string;
}
