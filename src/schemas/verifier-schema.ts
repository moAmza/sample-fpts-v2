import { Schema } from 'mongoose';

export interface VerifierType {
  _id: VerifierId;
  code: VerifierCode;
  count: number;
  email: ValidEmail;
  userInfo: InRegisterUser;
  createdAt: Date;
  updatedAt: Date;
}

export const initVerifierSchema = () =>
  new Schema<VerifierType>(
    {
      code: { type: Number, required: true },
      email: { type: String, required: true },
      count: { type: Number, required: true },
      userInfo: { type: Object, required: true },
    },
    { timestamps: true },
  );
