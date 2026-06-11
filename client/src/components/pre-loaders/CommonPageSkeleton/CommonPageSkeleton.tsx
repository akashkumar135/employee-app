import Skeleton from "../../Skeleton/Skeleton";
import "./style.css";

export const CommonPageSkeleton = () => {
  return (
    <div className="page-skeleton-wrapper">
      <Skeleton className="page-skeleton-header" />

      <div className="page-skeleton-content">
        <div className="page-skeleton-side-content">
          <Skeleton className="page-skeleton-common " />
          <Skeleton className="page-skeleton-common " />
        </div>
        <div className="page-skeleton-side-content">
          <Skeleton className="page-skeleton-common " />
          <Skeleton className="page-skeleton-common " />
        </div>
        <div className="page-skeleton-side-content">
          <Skeleton className="page-skeleton-common " />
          <Skeleton className="page-skeleton-common " />
        </div>
      </div>
    </div>
  );
};
