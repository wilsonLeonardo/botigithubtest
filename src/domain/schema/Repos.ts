import { Schema } from 'mongoose';

export interface IRepo {
  _id?: number;
  id?: number;
  full_name: string;
  stargazers_count: number;
  language: string;
}

export const Repo: Schema = new Schema<IRepo>(
  {
    _id: {
      type: Number,
    },
    full_name: {
      type: String,
    },
    language: {
      type: String,
    },
    stargazers_count: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);
