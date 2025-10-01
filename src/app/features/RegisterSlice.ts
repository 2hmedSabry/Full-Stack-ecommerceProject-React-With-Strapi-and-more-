import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axios.config";
import type { AxiosError } from "axios";


interface RegisterState {
    loading: boolean;
    data: RegisterResponse | null;
    error: errorResponse | null;
}

interface RegisterResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

interface errorResponse {
    message: string;
    response: {
        data: {
            message: string;
        };
    };
}

export const userRegisterAction = createAsyncThunk<RegisterResponse, { username: string; email: string; password: string }, { rejectValue: errorResponse }>(
    "register/registerAction",
    async (user , { rejectWithValue  }) => {
        try {
            const { data } = await axiosInstance.post(`/api/auth/local/register`, user);
            return data;
        } catch (err ) {
            const error = err as AxiosError<{ message: string }>
            return rejectWithValue({
                message: error.message,
                response: {
                    data: {
                        message: error.response?.data?.message || "Something went wrong",
                    }, } 
                }
                ) ;
        }
    }
);
const initialState: RegisterState = {
    loading: false,
    data: null,
    error: null,
}



const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegisterAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegisterAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(userRegisterAction.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload as errorResponse;
            })
    }
})


export default registerSlice.reducer;

export const selectRegister = (state: { register: typeof initialState }) => state.register;
