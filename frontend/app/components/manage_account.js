const changePassword = async (event) => {
  return;
};

const deleteAccount = async (event) => {
  return;
};

const logOut = async (event) => {
  return;
};

export default function ManageAccount() {
  return (
    <div>
      <p className="text-white text-lg pb-4">User Email</p>
      <form
        onSubmit={changePassword}
        className="flex flex-col space-around w-full border-2 border-solid border-white rounded-md p-4"
      >
        <label className="text-white text-lg pb-2">Change Password</label>
        <input
          required
          type="password"
          id="pass1"
          className="flex-grow rounded-full px-5 p-2 m-1 text-black"
          placeholder="new password"
        />
        <input
          required
          type="password"
          id="pass2"
          className="flex-grow rounded-full px-5 p-2 m-1 text-black"
          placeholder="confirm new password"
        />
        <button
          type="submit"
          className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-lg rounded-full w-48"
        >
          Change Password
        </button>
      </form>
      <div className="flex flex-row-reverse m-2 mt-10 text-white font-black">
        <button
          onClick={deleteAccount}
          className="flex flex-row text-xl m-2 bg-red-500 hover:bg-red-400 active:bg-red-600 p-2 px-4 rounded-full "
        >
          Delete Account
        </button>
        <button
          onClick={logOut}
          className="flex flex-row text-xl  m-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 p-2 px-4 rounded-full "
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
