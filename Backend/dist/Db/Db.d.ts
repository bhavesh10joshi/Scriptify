import { Schema } from "mongoose";
export declare const UserModel: import("mongoose").Model<{
    name: string;
    email: string;
    password: string;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    email: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ProductModel: import("mongoose").Model<{
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
}, import("mongoose").Document<unknown, {}, {
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: import("mongoose").Types.ObjectId;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    productDescription?: string | null;
    shortDescription?: string | null;
    keySellingPoints?: string | null;
    seoKeywords?: string | null;
    productTagline?: string | null;
    createdDate?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Db.d.ts.map