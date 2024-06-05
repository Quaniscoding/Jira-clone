import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    user: []
}

const deleteUserFromProject = createSlice({
    name: "deleteUserFromProject",
    initialState,
    reducers: {}
});

export const { } = deleteUserFromProject.actions

export default deleteUserFromProject.reducer

export const callDeleteUserFromProject = (data) => async () => {
    try {
        const result = await http.post("/Project/removeUserFromProject", data);
        return { message: result.data.message }
    } catch (err) {
        return { message: err.response.data.message }
    }
}