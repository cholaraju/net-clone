"use client"
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import PlayVideoModel from "./PlayVideoModel";
import { useState } from "react";
import { addTowatchlist, deleteFromWatchlist } from "../action";
import { usePathname } from "next/navigation";

interface iAppProps {
  title: string;
  overView: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

export default function MovieCard({
  movieId,
  overView,
  title,
  watchList,
  watchListId,
  youtubeUrl,
  age,
  time,
  year,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <button onClick={()=> setOpen(true)}className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form action={deleteFromWatchlist}>
            <input type="hidden" name="watchlistId" value={watchListId} />
            <input type="hidden" name="pathname" value={pathname}/>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={addTowatchlist}>
            <input type="hidden" name="movieId" value={movieId}/>
            <input type="hidden" name="pathname" value={pathname}/>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {age} +
          </p>
          <p className="font-normal text-sm">{time} h</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overView}
        </p>
      </div>
      <PlayVideoModel
        youtubeUrl={youtubeUrl}
        key={movieId}
        title={title}
        overview={overView}
        state={open}
        changeState={setOpen}
        age={age}
        duration={time}
        release={year}
      />
    </>
  );
}
