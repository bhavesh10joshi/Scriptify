// TypeScript interfaces that match the backend database schema (Db.ts)
// We export a dummy const here so Vite can resolve this as a proper ESM module
// (type-only .ts files without runtime exports can fail in native ESM dev mode)
export const _productDataModule = true;

export interface ProductData {
    _id: string;
    userId: string;
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
    // AI generated fields
    productDescription?: string;
    shortDescription?: string;
    keySellingPoints?: string;
    seoKeywords?: string;
    productTagline?: string;
    createdDate?: string;
}
