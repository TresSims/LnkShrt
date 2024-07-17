export default function LinkCopy({ id }) {
  let link = `${window.location.origin}/api/${id}`;

  return (
    <div className="py-5 flex flex-row justify-center place-items-center">
      <button
        onClick={() => navigator.clipboard.writeText({ link })}
        className="flex flex-row text-xs md:text-xl place-items-center bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white p-2 rounded-full"
      >
        <p className="px-5 font-black">{link}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 md:w-8 md:h-8"
        >
          <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
          <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
        </svg>
      </button>
    </div>
  );
}
