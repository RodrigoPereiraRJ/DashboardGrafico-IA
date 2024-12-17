import { createSlice } from "@reduxjs/toolkit";

const username = {
    nomedousuario: '',
    usuariojaescrito: false
}

const nomeuser = createSlice({
    name: 'nameuser',
    initialState: username,
    reducers: {
        setuser: (state, action)=>{
          state.nomedousuario = action.payload.username,
          state.usuariojaescrito = true
        }
    }

})

export const {setuser} = nomeuser.actions
export default nomeuser.reducer