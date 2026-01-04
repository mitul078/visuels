const ProductSkeleton = ({ className = "" }) => {
    return (
        <div className="create-product-view skeleton">
            <div className="form-header">
                <div className="sk-title"></div>
                <div className="sk-subtitle"></div>
            </div>

            <div className="product-form">
                <div className="sk-box large"></div>

                <div className="sk-box"></div>

                <div className="sk-box textarea"></div>

                <div className="sk-row">
                    <div className="sk-box"></div>
                    <div className="sk-box"></div>
                </div>

                <div className="sk-button"></div>
            </div>
        </div>
    )
}

export default ProductSkeleton
