import {
  ActivityDataAction,
  CaseDataAction,
  getActivityLimit,
  getActivityNextLimit,
  ImageIDAction,
  SignInDataAction,
} from "../Redux/Reducer/ActivityReducer";
import {
  activeListPostOptions,
  getCaseStudyOptions,
  host,
  signInPostOptions,
  uploadDocOptions,
} from "./Config";

export const signIn = (credentials, dispatch, navigation, setLoading) => {
  setLoading(true);
  const creds = {
    email: "demo@hospital.com",
    password: "demo123",
  };
  const raw = JSON.stringify(creds);
  const reqOptions = signInPostOptions(raw);
  fetch(`${host}auth/signin/`, reqOptions)
    .then((response) => response.text())
    .then((result) => {
      dispatch(SignInDataAction(JSON.parse(result)));
      setLoading(false);
      navigation.navigate("Tabs");
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
};

export const getActiveList = (dispatch, setLoading) => {
  setLoading(true);
  const requestOptions = activeListPostOptions();
  fetch(`${host}studies/activeList`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data=JSON.parse(result).studies
      dispatch(ActivityDataAction(JSON.parse(result).studies))
      dispatch(getActivityLimit(data.slice(0,6)))
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
};

export const getNextActivityLimit=(data, lastPos,dispatch)=>{
  dispatch(getActivityNextLimit(data.slice(lastPos,lastPos+6)))
}

export const getCaseDetail = (id, dispatch, navigation,setLoading) => {
  setLoading(true);
  const requestOptions = getCaseStudyOptions();
  fetch(`${host}studies/getHospitalStudy/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      dispatch(CaseDataAction(JSON.parse(result)));
      setLoading(false);
      navigation.navigate("Details")
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
};

export const uploadDocument = (formData, id, imageName, navigation, dispatch, setLoading) => {
  setLoading(true);
  const reqOptions = uploadDocOptions(formData);

  fetch(`${host}files`, reqOptions)
    .then((response) => response.text())
    .then((result) => {
      const imageId=JSON.parse(result)
      dispatch(ImageIDAction(imageId));
      const raw=JSON.stringify({
        "_id":id,
        "images":`[{img:${imageId["_id"]}, name:example]`,
      })
      UpdateDocForUid(raw,setLoading, navigation)
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
};

export const UpdateDocForUid = (rawData, setLoading, navigation) => {
  setLoading(true);
  const reqOptions = signInPostOptions(rawData);
  fetch(`${host}studies/update`, reqOptions)
    .then((response) => response.text())
    .then((result) => {
      alert("Successfully upload doc and updated details");
      setLoading(false);
      navigation.navigate("Details")
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
};
