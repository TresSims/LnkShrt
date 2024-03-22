"use client";

const signup = async (event) => {
  return;
};

export default function Signup() {
  return (
    <form onSubmit={signup} className="flex flex-col space-around w-full">
      <label className="text-white font-black text-lg pb-4">Sign Up</label>
      <input
        required
        type="email"
        id="email"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="you@example.com"
      />
      <input
        required
        type="password"
        id="pass1"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="password"
      />
      <input
        required
        type="confirm password"
        id="pass2"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="password"
      />
      <button
        type="submit"
        className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-lg rounded-full w-48"
      >
        Sign-up
      </button>
    </form>
  );
}
