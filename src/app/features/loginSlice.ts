import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axios.config";
import  {createStandaloneToast} from '@chakra-ui/react'


const {toast} = createStandaloneToast()

import type { PayloadAction } from "@reduxjs/toolkit";
import CookiesService from "../../services/CookiesService";

interface UserResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface errorResponse {
  message: string
  response: {
    data: {
      message: string 
    };
  };
 
}

interface LoginState {
  loading: boolean;
  data: UserResponse | null;
  error: errorResponse  | null;
}

const initialState: LoginState = {
  loading: false,
  data: null ,
  error: null,
};

// AsyncThunk
export const userLogin = createAsyncThunk<UserResponse, { identifier: string; password: string }, { rejectValue: errorResponse }>(
  "login/userLogin",
  async (user , { rejectWithValue  }) => {
    try {
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      return data;
    } catch (err ) {
      return rejectWithValue(err as errorResponse) ;
    }
  }
);

// Slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
    .addCase(userLogin.pending, (state) => {
        state.loading = true;        
      })


      .addCase(userLogin.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.loading = false;
        state.data = action.payload;
        const date = new Date();
        const In_DAYS = 3
        const EXPIRES_AT = + 1000 * 60 * 60 * 24 * 3 * In_DAYS
        date.setTime(date.getTime() + EXPIRES_AT);
        const options = {
          path : '/'
          , expires: date,
          httpOnly: true
        }
        CookiesService.setCookie('jwt', action.payload.jwt , options);
        toast({
          title: 'Logged in',
          status: 'success',
          isClosable: true,
        })

      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload  as errorResponse 
        toast({
          title: `${action.payload?.response.data.message}` || `${action.payload?.message}` ,
          description: "Make sure you have the correct email and password",
          status: 'error',
          isClosable: true, 
        })
      });
  },
});

export const selectLogin = (state: { login: LoginState }) => state.login;
export default loginSlice.reducer;
