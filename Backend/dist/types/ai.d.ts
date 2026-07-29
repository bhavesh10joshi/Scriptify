export interface ProductInput {
    name: string;
    category: string;
    brandName: string;
    keyFeatures: string;
    targetAudience: string;
}
export interface AIContentResult {
    productDescription: string;
    shortDescription: string;
    keySellingPoints: string;
    seoKeywords: string;
    productTagline: string;
}
export interface RefineInput {
    existingContent: {
        name: string;
        category: string;
        brandName: string;
        keyFeatures: string;
        targetAudience: string;
        productDescription: string;
        shortDescription: string;
        keySellingPoints: string;
        seoKeywords: string;
        productTagline: string;
    };
    suggestion: string;
}
//# sourceMappingURL=ai.d.ts.map