import { Activity_Data, Get_Case_Data, Get_Image_Id, Sign_In_Data } from "./GlobalActions"


export const SignInDataAction=(data)=>{
    return {
        type:Sign_In_Data,
        payload:data
    }
}

export const ActivityDataAction=(data)=>{
    return{
        type:Activity_Data,
        payload:data
    }
}

export const CaseDataAction=(data)=>{
    return {
        type:Get_Case_Data,
        payload:data
    }
}

export const ImageIDAction=(data)=>{
    return {
        type:Get_Image_Id,
        payload:data
    }
}

const initialState={
    user:{},
    activity:{},
    caseDetail:{},
    imageResponse:{}
}

const ActivityReducer=(state=initialState,action)=>{
    switch (action.type) {
        case Sign_In_Data:
            return {
                ...state,
                user:action.payload
            }
        case Activity_Data:
            return {
                ...state,
                activity:action.payload
            }
        case Get_Case_Data:
            return {
                ...state,
                caseDetail:action.payload
            }
        case Get_Image_Id:
            return {
                ...state,
                imageResponse:action.payload
            }
        default:
            return state;
           
    }
}

export default ActivityReducer