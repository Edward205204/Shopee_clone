// interface Props {
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   targetPage: number;
//   size: number;
// }

// const renderButton = (defaultStyle: string) => {
//   return <button className={`${defaultStyle} cursor-not-allowed`}>...</button>;
// };
// const RANGE = 2;

// export default function Pagination({ targetPage, setPage, size }: Props) {
//   const defaultStyle = `p-4 bg-white rounded-sm shadow-sm h-max border not-selectable hover:opacity-50`;
//   const renderPagination = (index: number) => {
//     let hasDotFront = true;
//     let hasDotBack = true;
//     const currentPage = index + 1;
//     if (currentPage > targetPage + RANGE && currentPage <= size - RANGE && hasDotBack) {
//       hasDotBack = false;

//       return renderButton(defaultStyle);
//     } else if (currentPage > RANGE && currentPage < targetPage - RANGE && hasDotFront) {
//       hasDotFront = false;

//       return renderButton(defaultStyle);
//     }
//     return (
//       <button
//         className={`${defaultStyle} ${currentPage === targetPage ? 'border-cyan-600 bg-slate-200 cursor-not-allowed hover:opacity-100' : ''}`}
//         key={index}
//         onClick={() => setPage(currentPage)}
//       >
//         {currentPage}
//       </button>
//     );
//   };

//   return (
//     <div className='flex items-center h-4 my-4 mt-24 gap-x-4'>
//       <button className={defaultStyle}>Pre</button>
//       {new Array(size).fill(0).map((_, index) => renderPagination(index))}
//       <button className={defaultStyle}>Next</button>
//     </div>
//   );
// }

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  targetPage: number;
  size: number;
}
const renderEllipsis = (className: string, key: string) => {
  return (
    <button key={key} className={`${className} cursor-not-allowed`}>
      ...
    </button>
  );
};
const RANGE = 2;
export default function Pagination({ targetPage, setPage, size }: Props) {
  const defaultStyle = 'p-4 bg-white rounded-sm shadow-sm h-max border not-selectable hover:opacity-50';
  const renderPagination = () => {
    const pages = [];
    let hasDotFront = false;
    let hasDotBack = false;
    for (let i = 1; i <= size; i++) {
      if (i <= RANGE || i > size - RANGE || (i >= targetPage - RANGE && i <= targetPage + RANGE)) {
        pages.push(
          <button
            key={i}
            className={`${defaultStyle} ${
              i === targetPage ? 'border-cyan-600 bg-slate-200 cursor-not-allowed hover:opacity-100' : ''
            }`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );
        continue;
      } else if (i < targetPage - RANGE && !hasDotFront && i > RANGE) {
        hasDotFront = true;
        pages.push(renderEllipsis(defaultStyle, 'dot-front'));
        continue;
      } else if (i > targetPage + RANGE && !hasDotBack && i <= size - RANGE) {
        hasDotBack = true;
        pages.push(renderEllipsis(defaultStyle, 'dot-back'));
      }
    }
    return pages;
  };

  return (
    <div className='flex items-center h-4 my-4 mt-24 gap-x-4'>
      <button className={defaultStyle}>Pre</button>
      {renderPagination()}
      <button className={defaultStyle}>Next</button>
    </div>
  );
}
