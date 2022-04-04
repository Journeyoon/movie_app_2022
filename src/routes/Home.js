import React from "react";
import axios from "axios";
import Movie from '../components/Movie';
import './Home.css'


class Home extends React.Component {                   //App 컴포넌트 (실행 순서 : render() > componentDidMount() )
  
  state = {                       //App 컴포넌트의 데이터
    isLoading : true,
    movies : [],
  };

  getMovies = async () => {       //서버에서 영화 데이터를 가져오는 함수
    const {
      data : {
        data : { movies },
      },
    } =  await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');     //영화 데이터 업로드
    this.setState({ movies, isLoading: false });    //state에 영화 데이터 저장
  };

  componentDidMount() {
    this.getMovies();
  }

  render () {
    const { isLoading, movies } = this.state;     //현재 상태를 구조 분해 할당
    return   <section className = "container">    {/* JSX 형식으로 반환     */}
      {isLoading ?         //영화 데이터가 업로드 되지 않은 경우
      (
        <div className = "loader">
          <span className = "loader__text">Loading...</span> 
        </div>
      ) :                  //영화 데이터가 업로드 된 경우
      ( 
        <div className = "movies">
          {movies.map(movie => (
            <Movie    //Movie props로 데이터 전송
              key = {movie.id}
              id = {movie.id}
              year = {movie.year}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
              genres = {movie.genres}
            />
          ))}
        </div> 
      )
    }</section>;
  }
}



export default Home;
