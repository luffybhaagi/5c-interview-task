import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivitySelector } from "../Redux/Reducer/Selectors";
import { getActiveList, getCaseDetail } from "../Server/Api";
import {
  View,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Card,
} from "native-base";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  EvilIcons,
  Ionicons,
  Foundation
} from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import moment from "moment";
import { SelectedCardAction } from "../Redux/Reducer/ActivityReducer";
import { Colors } from "../Styles/AppStyles";

const Data = [
  {
    id: "1",
    date: "01-jun-20",
    userid: "5e44fc8bc0b708474abc49d7",
    docName: "Dr.Testrad",
    etat: null,
    patientId: "142414.",
    patientName: "2819 RAISA SULTANA 62Y F",
    age: "50",
    gender: "F",
    study: "Leg",
    status: "Active",
    type: "X-Ray",
    part: "XRay Radiograph Face XRay Radiograph FIoniconsace",
  },
  {
    id: "2",
    date: "01-jul-20",
    userid: "5e44fc8bc0b708474abc49d7",
    docName: "Dr.Testrad",
    etat: null,
    patientId: "142414.",
    patientName: "2819 RAISA SULTANA 62Y F",
    age: "50",
    gender: "F",
    study: "Leg",
    status: "Active",
    type: "CT",
    part: "KUB",
  },
];

const Item2 = ({ item, navigation }) => {
    const dispatch=useDispatch()

    const showSelectedDetails=(seelctedCard, navigation)=>{
        dispatch(SelectedCardAction(seelctedCard))
        navigation.navigate("Details")
    }
  return (
    <>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => showSelectedDetails(item, navigation)}>
          <Card style={{ padding: 10 }}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateStyle}>
                {moment(item.assignedDate).format("DD-MM-YYYY")}
              </Text>
              <AntDesign name="calendar" size={20} color="blue" />
            </View>
            <View style={styles.container3}>
              <View style={styles.container4}>
                <View style={styles.container5}>
                  <Text style={styles.textStyle2}>{item._id}</Text>
                </View>
                <View style={styles.container6}>
                  <MaterialCommunityIcons name="doctor" size={18} />
                  {item.assignedGroup !== undefined && (
                    <Text style={styles.textStyle3}>
                      {item.assignedGroup["name"]}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.container4}>
                <View style={styles.container7}>
                  <EvilIcons name="user" size={18} />
                  <Text style={styles.textStyle2}>{item.patientName}</Text>
                </View>
              </View>
              <View style={styles.container4}>
                <View style={styles.container5}>
                <Foundation name={item.gender === "M" ? "male-symbol":"female-symbol"} size={18} color="black" />
                  <Text style={styles.textStyle2}>{item.gender}</Text>
                </View>
                <View style={styles.container6}>
                <MaterialCommunityIcons name="target" size={18} color="black" />
                  <Text style={styles.textStyle3}>{item.priority}</Text>
                </View>
              </View>
              <View style={styles.container4}>
                <View style={styles.container5}>
                <Entypo name="text-document" size={18} color="black" />
                  <Text style={styles.textStyle2}>{item.modality}</Text>
                </View>
                <View style={styles.container6}>
                <FontAwesome5 name="microscope" size={18} color="black" />
                  <Text style={styles.textStyle3}>{item.study}</Text>
                </View>
              </View>
              <View style={styles.container4}>
                <View style={styles.documentsContainer}>
                  <Entypo name="attachment" size={20} color="teal" />
                  <Text>Documents</Text>
                </View>
                <View style={styles.documentsContainer}>
                  <Feather name="mail" size={20} color="green" />
                  <Text>Messages</Text>
                </View>
                <View style={styles.documentsContainer}>
                  <FontAwesome5 name="newspaper" size={20} color="orange" />
                  <Text>Reports</Text>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function ActiveStudies({ navigation }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { activity } = useSelector(ActivitySelector);

  console.log(activity.studies);

  useEffect(() => {
    getActiveList(dispatch, setLoading);
  }, [dispatch, setLoading]);

  const showSelectedDetails = (item, navigation) => {};

  const handleOnClick = (id) => {
    getCaseDetail(id, dispatch, setLoading);
  };
  const renderItem = ({ item }) => {
    // console.log("+++++ Item ++++++"+item);
    return <Item2 navigation={navigation} item={item} />;
  };
  return (
    <>
      <StatusBar />
      <Appbar.Header style={styles.appHeaderContainer}>
        <View style={styles.container1}>
          <Text style={styles.textContainer}>Active Studies</Text>
          <AntDesign
            style={styles.iconContainer}
            name="poweroff"
            size={20}
            color="white"
          />
        </View>
      </Appbar.Header>
      <Header style={styles.searchContainer} searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        {/* <Text style={styles.textStyle1} >Search</Text> */}
      </Header>
      {activity.length > 0 && (
        <FlatList
          data={activity}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  appHeaderContainer: {
    justifyContent: "center",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: "10%",
  },
  textContainer: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  searchContainer: {
    alignItems: "center",
  },
  textStyle1: {
    fontWeight: "bold",
    color: "white",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
  },
  container3: {
    flexDirection: "column",
    marginTop: "5%",
    // alignItems:"center"
  },
  container4: {
    flexDirection: "row",
    marginTop: "3%",
  },
  container5: {
    width: "50%",
    flexDirection:"row",
    alignItems:"center"
  },
  container6: {
    width: "50%",
    marginLeft: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle2: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textStyle3: {
    color: Colors.activeStudiesBlueText.blue,
    fontWeight: "bold",
  },
  container7: {
    width: "80%",
    flexDirection:"row",
    alignItems:"center"
  },
  documentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
