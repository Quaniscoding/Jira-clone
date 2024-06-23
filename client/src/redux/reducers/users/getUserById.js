import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listUserById: []
}

const getUserById = createSlice({
    name: "getUserById",
    initialState,
    reducers: {
        getListUserById: (state, { type, payload }) => {
            state.listUserById = payload;
        }
    }
});

export const { getListUserById } = getUserById.actions

export default getUserById.reducer
export const callGetListUserById = (id) => async (dispatch) => {
    try {
        const result = await http.get(`/user/getUserById/${id}`);
        dispatch(getListUserById(result.data.content));
<<<<<<< HEAD
        return { isUserAsign: true, message: result.data.message, payload: result.data.content }
=======
        return { isUserAsign: true, message: result.data.message }
>>>>>>> fa99f6abfa9b7b6b6192122dc2d707c6c5181b56
    } catch (err) {
        if (err.response.status == 404) {
            return { isUserAsign: false, message: err.response.data.message }
        };
    }
}
