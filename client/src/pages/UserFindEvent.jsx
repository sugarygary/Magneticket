import React, { useEffect, useState } from "react";
import client from "../util/client";
import { Link, useLoaderData } from "react-router-dom";

const UserFindEvent = () => {
    let data = useLoaderData();
  return (
    <>
        <div className="">
        {data.length > 0 && (
            <div className="mt-24">
            <div className="font-bold text-2xl">EVENT</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sm:gap-4 md:gap-3 gap-2 px-4 py-2">
                {data.map((event) => (
                <div className="biruTua snap-start my-2 text-center flex-none rounded">
                    <img
                    src={`${process.env.BACKEND_URL}/promotor/eventposter-${event._id}.jpg`}
                    alt=""
                    className="aspect-[2/3] object-center w-full rounded"
                    />
                    <div className="text-white py-3 px-2">
                    <p
                        title={event.event_name}
                        className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
                    >
                        {event.event_name}
                    </p>
                    <Link
                        to={`/user/event/${event._id}`}
                        className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
                    >
                        Cari Tiket ➡
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    </>
  );
};

export default UserFindEvent;
