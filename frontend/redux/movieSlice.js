import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        toggle: false,
        trailerMovie: null,
        openDialog: false,
        id: ""
    },
    reducers: {
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        getTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        getUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },
        getTrailerMovie: (state, action) => {
            state.trailerMovie = action.payload;
        },
        setOpenDialog: (state, action) => {
            state.openDialog = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const {getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, setToggle, getTrailerMovie, setOpenDialog, setId} = movieSlice.actions;
export default movieSlice.reducer;