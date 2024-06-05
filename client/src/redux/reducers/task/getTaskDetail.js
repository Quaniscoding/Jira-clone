import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listTaskDetail: []
}

const getTaskDetail = createSlice({
    name: "getTaskDetail",
    initialState,
    reducers: {
        getlistTaskDetail: (state, { type, payload }) => {
            state.listTaskDetail = payload;
        }
    }
});

export const { getlistTaskDetail } = getTaskDetail.actions

export default getTaskDetail.reducer
export const callGetListTaskDetail = (taskId) => async (dispatch) => {
    try {
        const apiGetProject = await http.get(`/project/getTaskDetail/{taskId}`)
        dispatch(getlistTaskDetail(apiGetProject.data.content));
    } catch (err) {
        console.log(err);
    }
}