import { gql, useMutation, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { GET_SONGS } from "../queries/getSongs";

const DELETE_SONG = gql`
  mutation deleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
  });
  const handleSongDelete = async (song) => {
    await deleteSong({ variables: { id: song.id }, optimisticResponse: true });
  };

  if (loading) return <div />;

  return (
    <div>
      <ul className={"collection"}>
        {data.songs.map((song) => (
          <div key={song.id}>
            <button
              className={"btn btn-small red left"}
              onClick={() => handleSongDelete(song)}
            >
              <i className={"material-icons"}>delete</i>
            </button>
            <li className={"collection-item"}>
              <Link to={`/songs/${song.id}`}>{song.title}</Link>
            </li>
          </div>
        ))}
      </ul>
      <Link to={"/songs/new"} className={"btn-floating btn-large red right"}>
        <i className={"material-icons"}>add</i>
      </Link>
    </div>
  );
};
export default SongList;
