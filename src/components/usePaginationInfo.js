import { useMemo, useCallback } from "react";

/**
 * TanStack Table v8 + manualPagination 지원용 커스텀 페이지네이션 훅
 *
 * @param {Object} params
 * @param {Object} params.table - useReactTable 인스턴스
 * @param {boolean} params.manualPagination - 수동 페이지네이션 여부
 * @param {Object} params.pageInfo - { pageIndex, totalPages }
 * @param {Function} params.setPageInfo - setState 함수
 * @returns {{
 *   pageIndex: number,
 *   pageCount: number,
 *   hasNextPage: boolean,
 *   hasPreviousPage: boolean,
 *   goToPage: (index: number) => void,
 *   nextPage: () => void,
 *   previousPage: () => void,
 *   goToFirstPage: () => void,
 *   goToLastPage: () => void,
 * }}
 */
const usePaginationInfo = ({ table, manualPagination, pageInfo, setPageInfo }) => {
    const pageIndex = manualPagination
        ? pageInfo?.pageIndex ?? 0
        : table?.getState().pagination.pageIndex ?? 0;

    const pageCount = manualPagination
        ? pageInfo?.totalPages ?? 0
        : table?.getPageCount?.() ?? 0;

    const hasNextPage = manualPagination
        ? pageIndex < pageCount - 1
        : table?.getCanNextPage?.() ?? false;

    const hasPreviousPage = manualPagination
        ? pageIndex > 0
        : table?.getCanPreviousPage?.() ?? false;

    const goToPage = useCallback(
        (index) => {
            if (manualPagination) {
                setPageInfo?.((prev) => ({
                    ...prev,
                    pageIndex: Math.max(0, Math.min(index, pageCount - 1)),
                }));
            } else {
                table?.setPageIndex?.(index);
            }
        },
        [manualPagination, setPageInfo, table, pageCount]
    );

    const nextPage = useCallback(() => {
        goToPage(pageIndex + 1);
    }, [goToPage, pageIndex]);

    const previousPage = useCallback(() => {
        goToPage(pageIndex - 1);
    }, [goToPage, pageIndex]);

    const goToFirstPage = useCallback(() => {
        goToPage(0);
    }, [goToPage]);

    const goToLastPage = useCallback(() => {
        goToPage(pageCount - 1);
    }, [goToPage, pageCount]);

    return {
        pageIndex,
        pageCount,
        hasNextPage,
        hasPreviousPage,
        goToPage,
        nextPage,
        previousPage,
        goToFirstPage,
        goToLastPage,
    };
};

export default usePaginationInfo;
