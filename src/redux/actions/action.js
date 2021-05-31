import axios from "axios";
import queryString from "query-string";
import {
    FETCH_TOKEN_ERROR,
    FETCH_TOKEN_INPROGRESS,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOP_ARTIST_ERROR,
    FETCH_TOP_ARTIST_INPROGRESS,
    FETCH_TOP_ARTIST_SUCCESS,
    FETCH_TOP_TRACK_ERROR,
    FETCH_TOP_TRACK_INPROGRESS,
    FETCH_TOP_TRACK_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_USER_INPROGRESS,
    FETCH_USER_SUCCESS,
    SET_CODE,
} from ".";

export const setCode = (code) => ({
    type: SET_CODE,
    payload: code,
});

const fetchTokenInprogress = () => ({
    type: FETCH_TOKEN_INPROGRESS,
});

const fetchTokenSuccess = (data) => ({
    type: FETCH_TOKEN_SUCCESS,
    payload: data,
});

const fetchTokenError = (error) => ({
    type: FETCH_TOKEN_ERROR,
    error: error,
});

export const getToken = () => {
    return async function (dispatch, getState) {
        const { tokenState: { code } } = getState();

        const options = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            auth: {
                username: "d45167963940408e8732302c867374d5",
                password: "35ebcc2d29024775a9931c846430772b"
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: queryString.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3000/'
            })
        };

        try {
            dispatch(fetchTokenInprogress());
            let response = await axios.request(options);
            let data = await response;
            dispatch(fetchTokenSuccess(data.data.access_token));
        } catch (e) {
            dispatch(fetchTokenError(e.message));
        }
    };
};

const fetchUserInprogress = () => ({
    type: FETCH_USER_INPROGRESS
});

const fetchUserSuccess = (data) => ({
    type: FETCH_USER_SUCCESS,
    payload: data
});

const fetchUserError = (error) => ({
    type: FETCH_USER_ERROR,
    error: error
});

export const getUserData = () => {
    return async function (dispatch, getState) {
        const { tokenState: { token } } = getState();

        try {
            dispatch(fetchUserInprogress());
            let response = await axios.request({
                url: "https://api.spotify.com/v1/me",
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            const id = response.data.id;

            let user = await axios.request({
                url: `https://api.spotify.com/v1/users/${id}`,
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log(user)
            dispatch(fetchUserSuccess(user.data));
        }
        catch (err) {
            console.error(err);
            dispatch(fetchUserError(err));
        }
    }
}

const fetchTopArtistInprogress = () => ({
    type: FETCH_TOP_ARTIST_INPROGRESS
});

const fetchTopArtistSuccess = (data) => ({
    type: FETCH_TOP_ARTIST_SUCCESS,
    payload: data
});

const fetchTopArtistError = (error) => ({
    type: FETCH_TOP_ARTIST_ERROR,
    error: error
});

export const getTopArtist = () => {
    return async function (dispatch, getState) {
        const { tokenState: { token } } = getState();
        let terms = ["long_term","medium_term","short_term"]
        let getOptions = (term) => {
            return {
                method: 'GET',
                url: 'https://api.spotify.com/v1/me/top/artists?time_range=' + term,
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            };
        }
        try {
            dispatch(fetchTopArtistInprogress());
            let datas = { alltime: [], months: [], weeks: [] }
            let response = await axios.request(getOptions(terms[0]));
            let data = await response.data;
            datas.alltime = data.items;
            let mediumResponse = await axios.request(getOptions(terms[1]));
            let mediumData = await mediumResponse.data;
            datas.months = mediumData.items;
            let shortResponse = await axios.request(getOptions(terms[2]));
            let shortData = await shortResponse.data;
            datas.weeks = shortData.items;
            dispatch(fetchTopArtistSuccess(datas));
        } catch (e) {
            console.log(e);
            dispatch(fetchTopArtistError(e));
        }
    }
}

const fetchTopTrackInprogress = () => ({
    type: FETCH_TOP_TRACK_INPROGRESS
});

const fetchTopTrackSuccess = (data) => ({
    type: FETCH_TOP_TRACK_SUCCESS,
    payload: data
});

const fetchTopTrackError = (error) => ({
    type: FETCH_TOP_TRACK_ERROR,
    error: error
});

export const getTopTrack = () => {
    return async function (dispatch, getState) {
        const { tokenState: { token } } = getState();

        let terms = ["long_term","medium_term","short_term"]
        let getOptions = (term) => {
            return {
                method: 'GET',
                url: 'https://api.spotify.com/v1/me/top/tracks?time_range=' + term,
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            };
        }

        try {
            dispatch(fetchTopTrackInprogress());
            let datas = {alltime:[],months:[],weeks:[]};
            let response = await axios.request(getOptions(terms[0]));
            let data = await response.data;
            datas.alltime = data.items;
            let mediumResponse = await axios.request(getOptions(terms[1]));
            let mediumData = await mediumResponse.data;
            datas.months = mediumData.items;
            let shortResponse = await axios.request(getOptions(terms[2]));
            let shortData = await shortResponse.data;
            datas.weeks = shortData.items;
            dispatch(fetchTopTrackSuccess(datas));
        } catch (e) {
            console.log(e);
            dispatch(fetchTopTrackError(e));
        }
    }
}


