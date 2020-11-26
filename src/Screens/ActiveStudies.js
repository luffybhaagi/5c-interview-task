import { Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ActivitySelector } from '../Redux/Reducer/Selectors'
import { getActiveList, getCaseDetail } from '../Server/Api'


export default function ActiveStudies(){
    
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch()
    const { activity } = useSelector(ActivitySelector)

    useEffect(() => {
        getActiveList(dispatch, setLoading)
    }, [dispatch,setLoading])


    const handleOnClick=(id)=>{
        getCaseDetail(id,dispatch,setLoading)
    }

    return(
        <></>
    )
}