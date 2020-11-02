import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GET_SONGS } from "../queries/getSongs";

const ADD_SONG = gql`
  mutation addSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreateForm = () => {
  const [title, setTitle] = useState("");
  const [addSong] = useMutation(ADD_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
  });
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addSong({ variables: { title } });
    history.push("/songs");
  };

  return (
    <div>
      <Link to={"/songs"}>Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={handleFormSubmit}>
        <label>Song Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SongCreateForm;
