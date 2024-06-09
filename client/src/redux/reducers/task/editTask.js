import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const editTask = createSlice({
    name: "editTask",
    initialState,
    reducers: {}
});

export const { } = editTask.actions

export default editTask.reducer
export const callEditTask = (data, taskId) => async () => {
    try {
        const result = await http.post(`/project/updateTask/${taskId}`, data)
        console.log(result);
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        console.log(err);
        return { isUpdate: false, message: err.response.data.message }
    }
}