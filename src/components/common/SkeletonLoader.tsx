import styles from "./SkeletonLoader.module.scss";

export const StatSkeleton = () => {
    return (
        <div className={styles.statsGridSkeleton}>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`${styles.statCardSkeleton} ${styles.pulse}`}>
                    <div className={`${styles.iconSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.labelSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.valueSkeleton} ${styles.skeleton}`} />
                </div>
            ))}
        </div>
    );
};

export const TableSkeleton = () => {
    return (
        <div className={styles.tableSkeleton}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className={styles.tableRowSkeleton}>
                    <div className={`${styles.cellSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.cellSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.cellSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.cellSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.cellSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.cellSkeleton} ${styles.skeleton}`} />
                </div>
            ))}
        </div>
    );
};

export const UsersPageSkeleton = () => {
    return (
        <div className={styles.usersPageSkeleton}>
            <StatSkeleton />
            <TableSkeleton />
        </div>
    );
};

export const DetailsSkeleton = () => {
    return (
        <div className={styles.detailsSkeleton}>
            <div className={`${styles.backBtnSkeleton} ${styles.skeleton}`} />

            <div className={styles.headerSkeleton}>
                <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />
                <div className={styles.actionsSkeleton}>
                    <div className={`${styles.btnSkeleton} ${styles.skeleton}`} />
                    <div className={`${styles.btnSkeleton} ${styles.skeleton}`} />
                </div>
            </div>

            <div className={styles.profileBarSkeleton}>
                <div className={styles.summarySkeleton}>
                    <div className={`${styles.avatarSkeleton} ${styles.skeleton}`} />
                    <div className={styles.infoSkeleton}>
                        <div className={`${styles.nameSkeleton} ${styles.skeleton}`} />
                        <div className={`${styles.idSkeleton} ${styles.skeleton}`} />
                    </div>
                </div>
                <div className={styles.tabsSkeleton}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className={`${styles.tabSkeleton} ${styles.skeleton}`} />
                    ))}
                </div>
            </div>

            <div className={styles.mainCardSkeleton}>
                {[1, 2, 3].map((section) => (
                    <div key={section} className={styles.sectionSkeleton}>
                        <div className={`${styles.sectionTitleSkeleton} ${styles.skeleton}`} />
                        <div className={styles.gridSkeleton}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className={styles.itemSkeleton}>
                                    <div className={`${styles.itemLabelSkeleton} ${styles.skeleton}`} />
                                    <div className={`${styles.itemValueSkeleton} ${styles.skeleton}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
