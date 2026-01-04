const SkeletonBox = ({ className }) => (
    <div className={`skeleton ${className}`} />
)
const GetProductSkeleton = () => {
    return (
        < div className="list-product-view" >
            <div className="list-header">
                <div>
                    <SkeletonBox className="skeleton-title" />
                    <SkeletonBox className="skeleton-subtitle" />
                </div>

                <div className="list-stats">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="stat-item">
                            <SkeletonBox className="skeleton-stat-value" />
                            <SkeletonBox className="skeleton-stat-label" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Grid Skeleton */}
            <div className="products-grid" >
                {
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="product-card">
                            <div className="card-image-wrapper">
                                <SkeletonBox className="skeleton-image" />
                            </div>

                            <div className="card-content">
                                <SkeletonBox className="skeleton-card-title" />
                                <SkeletonBox className="skeleton-card-desc" />
                                <SkeletonBox className="skeleton-card-desc short" />

                                <div className="product-meta">
                                    <SkeletonBox className="skeleton-meta" />
                                    <SkeletonBox className="skeleton-meta small" />
                                </div>

                                <div className="product-footer">
                                    <SkeletonBox className="skeleton-price" />
                                    <SkeletonBox className="skeleton-date" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </div >
    )
}

export default GetProductSkeleton
