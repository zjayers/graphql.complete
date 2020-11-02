import { useQuery } from "@apollo/client";
import React from "react";
import { GET_SONG, GET_SONGS } from "../queries/getSongs";
import { useParams } from "react-router-dom";

const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SONG, { variables: { id } });
  return <div>Song: {loading ? "loading" : data.song.title}</div>;
};

export default SongDetail;
