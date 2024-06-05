import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { saveLocal } from '../../../utils/config';
import { DATA_PROJECT } from '../../../utils/constant';
import { history } from '../../../utils/history';
const initialState = {

}
const createProject = createSlice({
    name: "createProject",
    initialState,
    reducers: {

    }
});

export const { } = createProject.actions

export default createProject.reducer

export const callCreateProject = (data) => async () => {
    try {
        const apiCreateProject = await http.post("/project/createProject", data)
        history.push("/projectmanagement")
        saveLocal(DATA_PROJECT, apiCreateProject.data.content)
        return { isCreate: true }
    } catch (err) {
        if (err.response.data.statusCode == 500) {
            return { isExist: true }
        }
        else {
            return { isCreate: false }
        }
    }
}