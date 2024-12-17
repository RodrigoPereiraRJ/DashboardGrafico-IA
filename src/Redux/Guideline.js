import { createSlice } from "@reduxjs/toolkit";

const viewguid = {
    view: true
}

const guidlineview = createSlice({
    name: 'guidcontoll',
    initialState: viewguid,
    reducers: {
        disableguid: (state)=> {
            state.view = false
        }
    }
})

export const {disableguid} = guidlineview.actions

export default guidlineview.reducer
  
