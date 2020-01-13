import mongoose from 'mongoose'
import {prop} from 'typegoose';

enum OrderType {
    DATE = 'date',
    RATING = 'rating',
    RELEVANCE = 'relevance',
    TITLE = 'title',
    VIDEO_COUNT = 'videoCount',
    VIEW_COUNT = 'viewCount'
};

export class FavouriteQuery {
    @prop({required: true})
    public query: string;

    @prop({required: true})
    public name: string;

    @prop({enum: OrderType, required: true})
    public order: OrderType;

    @prop({required: true})
    public maxResults: number;
}
