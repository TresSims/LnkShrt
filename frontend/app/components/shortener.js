"use client";

import React, { useState } from "react";
import Axios from "axios";
import Error from "./error";
import LinkCopy from "./linkCopy";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const addLink = async (event) => {
  return (
    await Axios.post("/api/", { params: { link: event.target.link.value } })
  ).data;
};

export default function Shortener() {
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const mutation = useMutation({
    queryKey: ["links"],
    mutationFn: (event) => {
      event.preventDefault();
      return addLink(event);
    },
  });

  const validateURL = (e) => {
    try {
      new URL(e.target.value);
      setReadyToSubmit(true);
    } catch (err) {
      setReadyToSubmit(false);
    }
  };

  return (
    <>
      <div className="flex flex-row space-around">
        <form
          onSubmit={mutation.mutate}
          className="flex flex-row space-around w-full"
        >
          <input
            type="text"
            title="Please input a valid URL"
            name="link"
            id="link"
            required
            className="flex-grow rounded-full px-5 p-2 text-black"
            onChange={(e) => validateURL(e)}
            placeholder="https://tres-sims.com/"
          />
          <button
            type="submit"
            disabled={!readyToSubmit}
            className="w-2/12 ms-10 bg-orange-500 disabled:bg-gray-200 hover:bg-amber-500 active:bg-amber-400 text-lg font-black rounded-full"
          >
            Shrtn It
          </button>
        </form>
      </div>
      {mutation.isPending && <p>Submitting ...</p>}
      {mutation.isSuccess && <LinkCopy id={mutation.data.id} />}
      {mutation.isError && <Error />}
    </>
  );
}
