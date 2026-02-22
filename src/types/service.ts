export interface IReview {
    customerName: string;
    rating: number;
    review: string;
    createdAt: string | Date;
}

export interface IService {
    _id: string;
    name: string;
    slug: string;
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    description: string;
    price: number;
    features: string[];
    whyChooseUs: string[];
    rating: number;
    reviewCount: number;
    reviews?: IReview[];
}
