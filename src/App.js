import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import MovieComponet from "./components/MovieComponent";
import { useState } from "react";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";
import { BiMoviePlay } from "react-icons/bi";

export const API_KEY = `9f6a1e42`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;

const Placeholder = styled.img``;

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [timeoutId, setTimeoutId] = useState("");

  const [movieList, setMovieList] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState();

  const fetchData = async (searchString) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      setMovieList(res.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    setSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    setTimeoutId(timeout);
  };

  // console.log(movieList);

  return (
    <Container>
      <Header>
        <AppName>React Movie App</AppName>
        <SearchBox>
          <AiOutlineSearch
            style={{
              width: "32px",
              height: "32px",
              color: "black",
            }}
          />
          <SearchInput
            placeholder="Search Movie"
            onChange={onTextChange}
            value={searchQuery}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      <MovieListContainer>
        {movieList.length ? (
          movieList.map((movie, index) => (
            <MovieComponet
              key={index}
              movie={movie}
              setSelectedMovie={setSelectedMovie}
            />
          ))
        ) : (
          <BiMoviePlay
            style={{
              width: "120px",
              height: "120px",
              margin: "150px",
              opacity: "50%",
            }}
          />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
