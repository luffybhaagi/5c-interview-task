import React, { useState, useRef,useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "../Styles/AppStyles";
import { useDispatch, useSelector } from "react-redux";
import { ActivitySelector } from "../Redux/Reducer/Selectors";
import { uploadDocument } from "../Server/Api";
import BrandScreenSpinner from "../CommonUtils/BrandScreenSpinner";


const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.060);
const successButtonSize = Math.floor(WINDOW_HEIGHT * 0.060);
const addMoreVidoes = Math.floor(WINDOW_HEIGHT * 0.060);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);



export default function CameraPageScreen({route,navigation}) {

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const cameraRef = useRef();
  const [uriList,setUriList]=useState([])
  const [loading,setLoading]=useState(false)
  const [secs,setSecs]=useState(5)
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const [ count,setCount ] = useState(1)
  const [isActive,setIsActive]=useState(false)
  const {caseDetail}=useSelector(ActivitySelector)
  const dispatch=useDispatch()


  useEffect(() => {
    let interval=null
  if(secs === 0 && isActive){
    resetSecs()
    clearInterval(interval)
  } else if(isActive){
      interval=setInterval(()=>{
        setSecs(secs => secs-1)
      },1000)
  }
    return ()=> clearInterval(interval)
    
  }, [isActive,secs])

  const resetSecs=()=>{
    setSecs(5)
    setIsActive(false)
  }


  //currently camera functionality is not used
  const takePicture = async () => {
    if (cameraRef.current) {
      const CameraOptions = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(CameraOptions);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
        const imageName = source.substring(source.lastIndexOf('/')+1);
        console.log(imageName);       
        const tempImage = {
          uri:source,
          type:"image/jpeg",
          name:imageName
        } 

        setUriList([...uriList,tempImage]);
      }
    }
  };

  const recordVideo = async () => {
    
    if (cameraRef.current) {
      try {
        const options={
          maxDuration:4
        }
        const videoRecordPromise = cameraRef.current.recordAsync(options);
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const videoSource = data.uri;
          if (videoSource) {
            setIsPreview(true);
            console.log("video source", videoSource);
            setVideoSource(videoSource);
            const videoName = videoSource.substring(videoSource.lastIndexOf('/')+1);
            console.log(videoName);
            const tempVideo = {
              uri:videoSource,
              type:"video/mp4",
              name:videoName
            }
            setUriList([...uriList,tempVideo]);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    // stopVideoRecording()
    // setIsPreview(false);
    // setVideoSource(null);
    //set list to null on cancel
    // dispatch(storeUriListAction([]))
    navigation.navigate("Document")
  };

  const succesPreview = async () => {
    // setLoading(true)succesContainer
    //store uri list in redux on confirmation 
    uploadDocument(uriList[0],caseDetail["_id"], uriList[0].name, navigation, dispatch, setLoading)
  };
  // const addMoreVidoes = async () => {
  //   stopVideoRecording()
  //   await cameraRef.current.resumePreview();
  //   setCount(count+1);
  //   setIsPreview(false);
  //   setVideoSource(null);
  //   onCameraReady()
  // };
  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <AntDesign name="close" size={30} color="black" />
    </TouchableOpacity>
  );
  const renderSuccessPreiviewButton = () => (
    <>
    <View style={styles.succesContainer} >
    <TouchableOpacity onPress={succesPreview} style={styles.successButton} >
      <AntDesign name="check" size={30} color="white" />
      <Text style={{ color:"#ffffff"}} >{count}</Text>
    </TouchableOpacity>

    </View>
    </>
  );
  // const renderAddMoreVideos = () => (
  //   <TouchableOpacity onPress={addMoreVidoes} style={styles.addVideosButton}>
  //     <AntDesign name="plus" size={30} color="blue" />
  //   </TouchableOpacity>
  // );
  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      shouldPlay={true}
      style={{ flex:1 }}
      resizeMode={Video.RESIZE_MODE_COVER}
      useNativeControls={true}
    />
  );
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
      <View style={styles.secondsContainer} >
        { isActive ? <Text style={styles.secondsColor}>{secs}s</Text> : <Text style={styles.secondsColor}>Processing....</Text>}
      </View>
    </View>
  );
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <View style={styles.cameraContainer}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{"Flip"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        // onLongPress={()=>{
        //   recordVideo()
        //   setIsActive(true)
        // }}
        // onPressOut={stopVideoRecording}
        onPress={takePicture}
        style={styles.capture}
      />
      </View>
      </View>
  );

  if(loading)
  return <BrandScreenSpinner/>

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
      />
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderCancelPreviewButton()}
        {/* {isPreview && renderAddMoreVideos()} */}
        {isPreview && renderSuccessPreiviewButton()}
        {!isPreview && renderCancelPreviewButton() && renderCaptureControl() }
      </View>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  topContainer:{
  },
  closeButton: {
    position: "absolute",
    top: "10%",
    left: "5%",
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    opacity: 0.7,
    zIndex: 2,
  },
  successButton: {
    height: successButtonSize,
    width: successButtonSize,
    borderRadius: Math.floor(successButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    opacity: 0.7,
    zIndex: 2,
    flexDirection:"row"
  },
  addVideosButton: {
    position: "absolute",
    top: "10%",
    left: "65%",
    height: addMoreVidoes,
    width: addMoreVidoes,
    borderRadius: Math.floor(addMoreVidoes / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  control: {
    position: "absolute",
    flexDirection: "column",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: Colors.captureVideoColor.blue,
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
  secondsContainer:{
    flexDirection: "column",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "transparent",
    // opacity: 0.7,
  },
  secondsColor:{
    color:"#FFFFFF"
  },
  cameraContainer:{
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  videoText:{
    color:"#FFFFFF"
  },
  succesContainer:{
    flexDirection:"row",
    position: "absolute",
    top: "10%",
    left: "80%",
  }
});