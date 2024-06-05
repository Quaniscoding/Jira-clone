import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteProject = createSlice({
    name: "deleteProject",
    initialState,
    reducers: {}
});

export const { } = deleteProject.actions

export default deleteProject.reducer

export const callDeleteProject = (idProject) => async () => {
    try {
        await http.delete(`/project/deleteProject/${idProject}`);
        return { isDelete: true }
    } catch (err) {
        return { isDelete: false }
    }
}