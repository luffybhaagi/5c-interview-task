import { Activity_Data, Get_Activity_Limit, Get_Case_Data, Get_Image_Id, Get_Next_Limit, Selected_Card, Sign_In_Data } from "./GlobalActions"


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

export const SelectedCardAction=(data)=>{
    return {
        type:Selected_Card,
        payload:data
    }
}

export const getActivityLimit=(data)=>{
    return {
        type:Get_Activity_Limit,
        payload:data
    }
}

export const getActivityNextLimit=(data)=>{
    return {
        type:Get_Next_Limit,
        payload:data
    }
}

const initialState={
    user:{},
    activity:{},
    caseDetail:{},
    imageResponse:{},
    selectedCard:{},
    activityLimit:[]
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
        case Selected_Card:
            return{
                ...state,
                selectedCard:action.payload
            }
        case Get_Activity_Limit:
            return {
                ...state,
                activityLimit:action.payload
            }
        case Get_Next_Limit:
            return {
                ...state,
                activityLimit:[...state.activityLimit,...action.payload]
            }
        default:
            return state;
           
    }
}

export default ActivityReducer