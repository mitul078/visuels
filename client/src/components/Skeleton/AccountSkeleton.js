"use client"
import React from "react"


const AccountSkeleton = () => {
    return (
        <div className="account-skeleton">
            <div className="container">

                <div className="profile-header-skeleton">
                    <div className="left">
                        <div className="avatar-skeleton shimmer"></div>

                        <div className="user-info">
                            <div className="line lg shimmer"></div>
                            <div className="line md shimmer"></div>
                            <div className="line sm shimmer"></div>
                            <div className="line sm shimmer"></div>
                        </div>
                    </div>

                    <div className="edit-btn-skeleton shimmer"></div>
                </div>

                {/* Stats Skeleton */}
                <div className="stats-skeleton">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="stat-card shimmer"></div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="content-grid-skeleton">

                    {/* Personal Info */}
                    <div className="section-skeleton">
                        <div className="section-title shimmer"></div>

                        <div className="info-grid">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="info-item shimmer"></div>
                            ))}
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="section-skeleton">
                        <div className="section-title shimmer"></div>

                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="setting-item shimmer"></div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AccountSkeleton
