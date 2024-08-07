export default function Pagination({ page, entries, pageLength, goToPage }) {
  let pageCount = Math.trunc(entries / pageLength);
  if (entries % pageLength > 0) {
    pageCount++;
  }
  const arr = new Array(pageCount).fill(0);

  const incrementPage = () => {
    let newPage = page + 1;
    if (newPage > pageCount) {
      newPage = pageCount;
    }
    goToPage(newPage);
  };

  const decrementPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = 1;
    }

    goToPage(newPage);
  };

  return (
    <div className="flex flex-row justify-between">
      <button
        onClick={decrementPage}
        className="text-xs lg:text-lg w-48 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-full text-white font-black py-2 px-4"
      >
        Previous Page
      </button>
      <div className="flex flex-row text-orange-500 text-sm font-black">
        {arr.map((x, i) => {
          if (i == page - 1) {
            return (
              <button
                onClick={() => goToPage(i + 1)}
                key={i}
                className="text-xs lg:text-lg bg-white rounded-full w-10 h-10 mx-2"
              >
                {i + 1}
              </button>
            );
          } else {
            return (
              <button
                onClick={() => goToPage(i + 1)}
                key={i}
                className="text-xs lg:text-lg rounded-full border-2 w-10 h-10 mx-2"
              >
                {i + 1}
              </button>
            );
          }
        })}
      </div>
      <button
        onClick={incrementPage}
        className="text-xs lg:text-lg w-48 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-full text-white font-black py-2 px-4 "
      >
        Next Page
      </button>
    </div>
  );
}
